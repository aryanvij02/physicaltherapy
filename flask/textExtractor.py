from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def get_text():
    try:
        with open('thresholds.txt', 'r') as file:
            text = file.read()
            print(text)
        return jsonify({'text': text})
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002)
