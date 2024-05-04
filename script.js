const PROXY_URL = 'https://cors-anywhere.herokuapp.com/corsdemo'; //для избежания проблем с CORS
const API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
//токен необходимо менять каждые 12 часов
const IAM_TOKEN = 't1.9euelZrMjI-KypnGjomeiZWVkZbJx-3rnpWaj8jJzZrHnpyOjIyNm8zMnJHl9Pc6DCdO-e9ARleT3fT3ejokTvnvQEZXk83n9euelZqax42Vk5KRxs2PlpGdk5vOyu_8xeuelZqax42Vk5KRxs2PlpGdk5vOyg.59V3enQKDupbnhxI2D_qEr9SjyY2bR4OiCAwggSjHivHxii3NbQSLcTuPhb0J4XNyrxWHL_8tlijmOTycn4CCA';
const FOLDER_ID = 'b1gpk33mjeuna2237k6p';


document.getElementById('submit-btn').addEventListener('click', function() {
    const input = document.getElementById('question');
    const gptResponse = document.getElementById('gpt-response');
    const question = input.value;

    input.value = '';
    document.getElementById('your-question').innerHTML = '<b>Вопрос:</b> ' + question;
    gptResponse.innerText = 'Загрузка...';

    const data = {
        modelUri: `gpt://${FOLDER_ID}/yandexgpt-lite`,
        completionOptions: {
            stream: false,
            temperature: 0.1,
            maxTokens: "200"
        },
        messages: [
            {
                role: "system",
                text: "Отвечай как самый умный человек на свете"
            },
            {
                role: "user",
                text: question
            }
        ]
    };

    fetch(PROXY_URL + API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + IAM_TOKEN,
            'x-folder-id': FOLDER_ID,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            gptResponse.innerHTML = '<b>Ответ:</b> ' + data.result.alternatives[0].message.text;
        })
        .catch(error => {
            console.error('Error:', error);
            gptResponse.innerText = 'Произошла ошибка';
        });
});