# # from flask import Flask, request, jsonify
# # import os

# # app = Flask(__name__)

# # @app.route('/save', methods=['POST'])
# # def save_text():
# #     text = request.form['text']  # Getting text from form data
# #     filename = os.path.join(os.getcwd(), 'output.txt')  # Absolute path to the file

# #     try:
# #         # Save the text to a file
# #         with open(filename, 'w') as file:
# #             file.write(text)
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# #     return f"Text saved to {filename}"

# # if __name__ == '__main__':
# #     app.run(debug=True, port=5001)
# from flask import Flask, request, jsonify
# import os
# from flask_cors import CORS
# import requests
# import json
# app = Flask(__name__)
# CORS(app)
# @app.route('/save', methods=['POST'])
# def save_text():
#     text = request.form['text']
#     url = 'http://localhost:5002/process'
#     filename = os.path.join(os.getcwd(), 'output.txt')
#     # Attempt to parse text to JSON and send it
#     try:
#         data = json.loads(text)  # Assumes `text` is a JSON string
#     except json.JSONDecodeError:
#         return jsonify({"error": "Invalid JSON format"}), 400
#     # Send the JSON data to the process endpoint
#     try:
#         response = requests.post(url, json=data)
#         response_text = response.text
#     except requests.ConnectionError as e:
#         return jsonify({"error": str(e)}), 500
#     # Try to write the original text to a file
#     try:
#         with open(filename, 'w') as file:
#             file.write(text)
#             print(f"Response from /process: {response_text}")  # Logging the response for debugging
#     except Exception as e:
#         print(f"Failed to write to file: {filename}")
#         print(f"Error: {str(e)}")
#         return jsonify({"error": str(e)}), 500
#     return jsonify({"message": f"Text saved to {filename}", "process_response": response_text})
# @app.route('/pref', methods=['POST'])
# def save_preferences():
#     print("I WAS CCALLED !!!! !")
#     text = request.form['text']
#     filename = os.path.join(os.getcwd(), 'pref.txt')
#     try:
#         with open(filename, 'w') as file:
#             file.write(text)
#     except Exception as e:
#         print(f"Failed to write to file: {filename}")
#         print(f"Error: {str(e)}")
#         return jsonify({"error": str(e)}), 500
#     return jsonify({"message": f"Text saved to {filename}"})
# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)
def process_data(input_data):
    if isinstance(input_data, str):
        data = json.loads(input_data)
    else:
        data = input_data
    unique_keys = {key for entry in data for key in entry if key != 'rep'}
    reps = sorted(set(entry['rep'] for entry in data))
    stats = {rep: {key: [] for key in unique_keys} for rep in reps}
    for entry in data:
        rep = entry['rep']
        for key in unique_keys:
            stats[rep][key].append(entry[key])
    results = {}
    for rep, values in stats.items():
        rep_stats = {}
        for key, val_list in values.items():
            rep_stats[key] = {
                "min": min(val_list),
                "max": max(val_list),
                "average": sum(val_list) / len(val_list)
            }
        results[rep] = rep_stats
    return json.dumps(results, indent=4)
@app.route('/save', methods=['POST'])
def save_text():
    text = request.form['text']
    url = 'http://localhost:5002/process'
    output_filename = os.path.join(os.getcwd(), 'output.txt')
    thresholds_filename = os.path.join(os.getcwd(), 'thresholds.txt')
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 400
    try:
        response = requests.post(url, json=data)
        response_text = response.text
        with open(output_filename, 'w') as file:
            file.write(text)
        processed_data = process_data(data)
        with open(thresholds_filename, 'w') as file:
            file.write(processed_data)
    except requests.ConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify({
        "message": f"Text saved to {output_filename}",
        "process_response": response_text,
        "thresholds": processed_data
    })
@app.route('/pref', methods=['POST'])
def save_preferences():
    text = request.form['text']
    filename = os.path.join(os.getcwd(), 'pref.txt')
    try:
        with open(filename, 'w') as file:
            file.write(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify({"message": f"Text saved to {filename}"})
if __name__ == '__main__':
    app.run(debug=True, port=5001)