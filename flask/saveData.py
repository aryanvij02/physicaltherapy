from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/save', methods=['POST'])
def save_text():
    text = request.form['text']  # Getting text from form data
    filename = os.path.join(os.getcwd(), 'output.txt')  # Absolute path to the file

    try:
        # Save the text to a file
        with open(filename, 'w') as file:
            file.write(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return f"Text saved to {filename}"

if __name__ == '__main__':
    app.run(debug=True, port=5001)