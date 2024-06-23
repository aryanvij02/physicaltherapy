# #openai-data-to-mp3
# #openai-data-to-mp3
# from flask import Flask, request, send_file, jsonify
# import os
# from openai import OpenAI
# from io import BytesIO

# app = Flask(__name__)
# client = OpenAI(api_key="sk-proj-Gt2ofLTFqwXoav69TYuTT3BlbkFJCqE6W19U5e5i4VgHGXjO")

# def chat_with_gpt(train_data, prefs):
#     try:
#         response = client.chat.completions.create(
#             model="gpt-4-turbo",
#             messages=[
#                 {"role": "system", "content": f{"role": "system", "content": f"Hello, I'm Donna, your virtual assistant for today's physical therapy session. I've analyzed your arm extension exercises based on the raw data provided for each repetition. You've completed {len(train_data)} repetitions. For your left elbow, the angles during these repetitions ranged from {min([d['leftElbow'] for d in train_data])} to {max([d['leftElbow'] for d in train_data])} degrees, while your right elbow ranged from {min([d['rightElbow'] for d in train_data])} to {max([d['rightElbow'] for d in train_data])} degrees. The optimal angles are between {thresholds['leftElbow']['min']} to {thresholds['leftElbow']['max']} degrees for the left elbow and {thresholds['rightElbow']['min']} to {thresholds['rightElbow']['max']} degrees for the right elbow. I will highlight any repetitions where the angles were below these thresholds, indicating insufficient range or improper form. Please maintain a consistent pace and form, as advised, with intervals of {prefs[0]['intervalPerSetTrain']} seconds per repetition and {prefs[0]['intervalBetweenSetsTrain']} seconds of rest between sets. Keep up the good work and ensure to adhere to these guidelines to maximize the benefits of your rehabilitation exercises."}}},
#                 {"role": "user", "content": "Please analyze the provided data."}
#             ]
#         )
#         return response.choices[0].message.content
#     except Exception as e:
#         return f"An error occurred: {str(e)}"

# @app.route('/process_data', methods=['POST'])
# def process_data():
#     if not request.json or not 'prefs' in request.json or not 'train_data' in request.json:
#         return jsonify({"error": "Missing data"}), 400

#     prefs = request.json['prefs']
#     train_data = request.json['train_data']

#     # Generate text response from GPT
#     text_response = chat_with_gpt(train_data, prefs)

#     # Convert text response to speech
#     try:
#         audio_response = client.audio.speech.create(
#             model="tts-1",
#             voice="nova",
#             input=text_response
#         )
#         mp3_data = audio_response.content
#         return send_file(BytesIO(mp3_data), mimetype='audio/mp3', as_attachment=True, download_name="response.mp3")
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5004)