import 'dotenv/config'
import express from "express";
import axios from "axios";
import OpenAI from "openai"; // Importa a biblioteca da OpenAI corretamente




const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, OPENAI_API_KEY } = process.env;



// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // Sua chave da OpenAI
});



app.post("/webhook", async (req, res) => {
  console.log("Recebi um webhook:", JSON.stringify(req.body, null, 2));
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];


  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    
    const data = [
  {"nome": "1Fit", "nicho": "Healthtech & wellness", "tema_palestra": "Saúde digital e bem-estar", "horario_palestra": "11:00 - 11:30"},
  {"nome": "4.events", "nicho": "Publicidade, conteúdo & marketing", "tema_palestra": "Inovações em marketing de eventos", "horario_palestra": "14:00 - 14:30"},
  {"nome": "506.ai", "nicho": "Inteligência Artificial & Machine Learning", "tema_palestra": "Avanços em IA para negócios", "horario_palestra": "16:00 - 16:30"},
  {"nome": "Adrich", "nicho": "Inteligência Artificial & Machine Learning", "tema_palestra": "Transformando dados em insights", "horario_palestra": "10:00 - 10:30"},
  {"nome": "Aikido Security", "nicho": "Segurança", "tema_palestra": "Protegendo dados na era digital", "horario_palestra": "13:00 - 13:30"},
  {"nome": "Aktivo Labs", "nicho": "Healthtech & wellness", "tema_palestra": "Tecnologia para saúde personalizada", "horario_palestra": "15:00 - 15:30"},
  {"nome": "Apillon", "nicho": "SaaS", "tema_palestra": "Soluções SaaS para empresas modernas", "horario_palestra": "12:00 - 12:30"},
  {"nome": "Aufinity Group", "nicho": "Tecnologia financeira", "tema_palestra": "Inovações em fintech", "horario_palestra": "17:00 - 17:30"}
];
    
    
    const dataDetail = data.map(item => `${item.nome} (${item.nicho}): "${item.tema_palestra}" das ${item.horario_palestra}`).join("\n");

const META_PROMPT = `Você é um assistente especializado no Web Summit. Responda apenas sobre estas startups: 

${dataDetail}.

# Diretrizes:
- **Responda exclusivamente sobre o Web Summit**: Você só pode fornecer informações relacionadas ao evento, incluindo programação, palestrantes, edições passadas, oportunidades de networking e qualquer outro aspecto diretamente ligado ao Web Summit.
- **Evite respostas fora do contexto**: Se um usuário fizer uma pergunta que não esteja relacionada ao Web Summit, responda educadamente que você está programado apenas para fornecer informações sobre o evento.
- **Forneça detalhes relevantes**: Ao responder, tente incluir informações atualizadas sobre datas, locais, temas abordados e palestrantes importantes.
- **Formato de resposta claro e objetivo**: Estruture suas respostas de maneira organizada e, se necessário, utilize listas ou seções para maior clareza.

# Exemplo de interação correta:
**Usuário:** Quem são os principais palestrantes do Web Summit deste ano?
**Assistente:** O Web Summit deste ano contará com palestrantes renomados, incluindo [Nome do Palestrante], CEO da [Empresa], e [Outro Nome], especialista em [Área].

# Exemplo de interação incorreta:
**Usuário:** O que é inteligência artificial?
**Assistente:** Desculpe, mas minha especialidade é fornecer informações sobre o Web Summit. Posso ajudá-lo com algo relacionado ao evento?`.trim();
    
   
    
    // Envia a mensagem para o ChatGPT
    const chatgptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo do ChatGPT
      messages: [
        {role: "system", content: META_PROMPT},
        { role: "user", content: message.text.body },
      ],
      max_tokens: 150,
    });

    const replyMessage = chatgptResponse.choices[0].message.content; // Resposta do ChatGPT

    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: replyMessage }, // Resposta do ChatGPT
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
