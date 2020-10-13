import json
from flask import request
from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
import time
from time import mktime
from datetime import datetime

app = Flask(__name__)
app.config['MYSQL_USER'] = 'ashish'
app.config['MYSQL_PASSWORD'] = 'Pass@123'
app.config['MYSQL_DB'] = 'Reservation'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)
CORS(app)


# initial
@app.route('/')
def Home():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT *FROM restriction_setting')
    data = cursor.fetchall()
    print(data)
    items = []
    for item in data:
        items.append(item)
    return json.dumps(items)


@app.route('/check', methods=['POST'])
def vaildate():
    data = request.json['data']
    n = data['n']
    d = data['d']
    g = data['g']
    tz = data['t']
    print(n, d, g, tz)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """UPDATE restriction_setting SET n = %s ,d =%s,g=%s,tz=%s WHERE id = %s""", (
            n, d, g, tz, 1)
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps({'res': 'updated'})


@app.route('/checkVaild', methods=['POST'])
def vaildateres():
    isRestricted = False
    resIds = []
    data = request.json['data']
    user_ids = data['user_ids']
    reservation_datetime = data['reservation_datetime']
    print(user_ids, reservation_datetime)
    ts = (datetime.strptime(reservation_datetime, '%a, %d %b %Y %H:%M:%S'))
    timestamp = datetime.timestamp(ts)
    print(int(timestamp))
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM restriction_setting')
    dataSetting = cursor.fetchone()
    cursor.execute('SELECT * FROM reservations')
    dataReservation = cursor.fetchall()
    if(dataSetting['g'] == 'individual'):
        for id in user_ids:
            cursor.execute(
                """SELECT count(*) as count FROM reservations where user_id =(%s) and reservation_timestamp_utc=(%s) """, [id, timestamp])
            dataReservation = cursor.fetchone()
            if(dataReservation['count'] > 0):
                print('not allowed')
                isRestricted = True
                resIds.append(id)
        return json.dumps({"isRestricted": isRestricted,  "restrictedId": resIds})
    else:
        print('group')
        group_ids = ','.join(map(str, user_ids))
        cursor.execute(
            """SELECT count(*) as count FROM reservations where user_id IN (%s) and reservation_timestamp_utc=(%s) """, [group_ids, timestamp])
        dataReservation = cursor.fetchone()
        if(dataReservation['count'] > 0):
            return json.dumps({"isRestricted": "false"})
        else:
            return json.dumps({"isRestricted": "true"})


if __name__ == "__main__":
    app.run(debug="True", host="0.0.0.0", port=5000)
