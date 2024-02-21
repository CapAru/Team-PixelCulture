import textwrap
from flask import Flask, request, render_template
import google.generativeai as genai

app = Flask(__name__)

# Configure Google Generative AI with your API key
genai.configure(api_key="AIzaSyBg4akratYUCIfcexIOKvnmfvymREcjieg")


# Function to convert text to Markdown format
def to_markdown(text):
    text = text.replace('**', '<br>')
    text = text.replace('*', '<br>•')
    return textwrap.indent(text, ' ')


# Define chatbot logic
def chatbot_response(query):
    # Create a GenerativeModel instance
    model = genai.GenerativeModel('gemini-pro')
    chat = model.start_chat(history=[])
    response = chat.send_message(query)
    generated_text = to_markdown(response.text)

    return generated_text


# Define route for the home page
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get user query from the form
        user_query = request.form['query']

        # Generate chatbot response
        bot_response = chatbot_response(f'Act as an chatbot of CulturalCanvas website for West bengal tourism and '
                                        f'artisans used for telling info or planning trips/tours (vocal for local) donot reply to inrelevant queries, query = "{user_query}"')

        # Format bot response
        bot_response = to_markdown(bot_response)

        return render_template('result.html', user_query=user_query, bot_response=bot_response)
    else:
        return render_template('result.html')


if __name__ == '__main__':
    app.run(debug=True)
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)
