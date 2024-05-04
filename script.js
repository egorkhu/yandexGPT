export const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/'; //для избежания проблем с CORS
export const API_URL = 'https://thingproxy.freeboard.io/fetch/https://llm.api.cloud.yandex.net/foundationModels/v1/completion'; // Замените на ваш URL
//токен необходимо менять каждые 12 часов
export const IAM_TOKEN = 't1.9euelZrLi8mNmoqRnpDJyZGYlZGLm-3rnpWaj8jJzZrHnpyOjIyNm8zMnJHl8_cSEShO-e9BUX8d_t3z91I_JU7570FRfx3-zef1656VmoqdnIyTjJrKyZmTnMiOkpzM7_zF656VmoqdnIyTjJrKyZmTnMiOkpzM.0JLGugFXmGYWcRkDzk9rhuLvyp8m6BnIKURGwDV1rUXM_YnsM6EMoth3O14XkxL3W_czCzrkVrunBDBmbFyBDA';
export const FOLDER_ID = 'b1gpk33mjeuna2237k6p';


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
        .catch(error => console.error('Error:', error));
});