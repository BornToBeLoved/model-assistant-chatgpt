from flask import Flask
app = Flask(__name__)

@app.route('/')
def hoome():
    return 'This is Home!'

if __name__ == '__main__':
    app.run('0.0.0.0', port=2000, debug = True)