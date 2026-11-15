/** Approved public character facts. Fictional delivery is kept separately below. */
export const familyKnowledge = {
 igal:{name:'Igal',age:41,role:'father',gender:'male',height:1.65,occupation:'software engineer',facts:'Works in software development, AI and automation. Creates interactive digital projects including this world. Has a creative background.'},
 anastasia:{name:'Anastasia',age:42,role:'mother',gender:'female',height:1.65,occupation:'psychologist',facts:'Facilitates psychological games and activities, including Leela.'},
 amelia:{name:'Amelia',age:17,role:'daughter',gender:'female',height:1.65,education:'school'},
 nataniel:{name:'Nataniel',age:7,role:'older son',gender:'male',height:1.2,education:'school'},
 adriel:{name:'Adriel',age:3,role:'younger son',gender:'male',height:1.025,education:'kindergarten'},
};
export const familyPersonality={igal:'Curious, creative, technically minded and friendly.',anastasia:'Warm, thoughtful, calm and welcoming. Discuss psychology generally; never diagnose or invent personal opinions.',amelia:'Natural, approachable teenage style without exaggerated slang.',nataniel:'Curious, adventurous, energetic. Short friendly answers.',adriel:'Playful, cheerful, very short accessible sentences. Never imitate a real child’s exact speech.'};
export function familyContext(id,question=''){
 const person=familyKnowledge[id];if(!person)return '';
 let text=`Approved character facts: ${JSON.stringify(person)}. Lives in Leipzig, Germany. Fictional delivery: ${familyPersonality[id]}`;
 if(/\b(dad|father|papa)\b|vater|пап|отец/iu.test(question))text+=' Approved father of the children: Igal, software engineer working with software, AI and automation.';
 if(/\b(mom|mother|mama)\b|mutter|мам|мать/iu.test(question))text+=' Approved mother of the children: Anastasia, psychologist facilitating psychological games including Leela.';
 return text;
}
const intents={
 name:[/^(what is|what's) your name$/, /^wie heißt du$/, /^как тебя зовут$/],
 age:[/^how old are you$/, /^wie alt bist du$/, /^сколько (тебе|вам) лет$/],
 gender:[/^are you a (boy or (a )?girl|girl or (a )?boy|man or (a )?woman)$/, /^bist du ein (junge oder ein mädchen|mädchen oder ein junge)$/, /^ты мальчик или девочка$/],
 location:[/^where do you live$/, /^wo wohnst du$/, /^где (ты жив[её]шь|вы жив[её]те)$/],
 education:[/^do you (go to|attend) (school|kindergarten)$/, /^gehst du (zur schule|in die schule|in den kindergarten)$/, /^ходишь ли ты в (школу|детский сад)$/, /^(ты ходишь|вы ходите) в (школу|детский сад)$/],
 father:[/^who is your (dad|father)$/, /^wer ist dein (papa|vater)$/, /^кто твой (папа|отец)$/],
 mother:[/^who is your (mom|mother)$/, /^wer ist deine (mama|mutter)$/, /^кто твоя (мама|мать)$/],
 fatherJob:[/^what does your (dad|father) do$/, /^was macht dein (papa|vater)$/, /^кем работает твой (папа|отец)$/],
 motherJob:[/^what does your (mom|mother) do$/, /^was macht deine (mama|mutter)$/, /^кем работает твоя (мама|мать)$/],
 job:[/^what do you do$/, /^was machst du beruflich$/, /^кем ты работаешь$/],
};
export function familyAnswer(id,question,locale){
 const p=familyKnowledge[id];if(!p)return null;
 const q=question.toLocaleLowerCase().trim().replace(/[?!.]+$/u,'').trim();
 const intent=Object.keys(intents).find(k=>intents[k].some(r=>r.test(q)));if(!intent)return null;
 const lang=['en','de','ru'].includes(locale)?locale:'en';
 const jobs={igal:['I’m a software engineer. I build digital projects and work with AI and automation.','Ich bin Softwareentwickler und arbeite mit KI und Automatisierung.','Я инженер-программист. Создаю цифровые проекты и работаю с ИИ и автоматизацией.'],anastasia:['I’m a psychologist. I also facilitate psychological games, including Leela.','Ich bin Psychologin und begleite psychologische Spiele, darunter Leela.','Я психолог. Также провожу психологические игры, в том числе Лилу.']};
 const n={en:0,de:1,ru:2}[lang];
 const year=p.age%10===1&&p.age%100!==11?'год':p.age%10>=2&&p.age%10<=4&&(p.age%100<12||p.age%100>14)?'года':'лет';
 const school=p.education==='kindergarten'?['I go to kindergarten!','Ich gehe in den Kindergarten!','Я хожу в детский сад!']:p.education==='school'?['I go to school.','Ich gehe zur Schule.','Я хожу в школу.']:['I’m an adult; I don’t attend school.','Ich bin erwachsen und gehe nicht zur Schule.','Я взрослый человек, в школу не хожу.'];
 const answers={name:[`I’m ${p.name}.`,`Ich heiße ${p.name}.`,`Меня зовут ${p.name}.`],age:[`I’m ${p.age}.`,`Ich bin ${p.age} Jahre alt.`,`Мне ${p.age} ${year}.`],location:['I live in Leipzig, Germany.','Ich wohne in Leipzig, Deutschland.','Я живу в Лейпциге, в Германии.'],education:school,gender:p.gender==='female'?[p.age<18?'I’m a girl.':'I’m a woman.',p.age<18?'Ich bin ein Mädchen.':'Ich bin eine Frau.',p.age<18?'Я девочка.':'Я женщина.']:[p.age<18?'I’m a boy.':'I’m a man.',p.age<18?'Ich bin ein Junge.':'Ich bin ein Mann.',p.age<18?'Я мальчик.':'Я мужчина.'],job:jobs[id]||school};
 if(['father','mother','fatherJob','motherJob'].includes(intent)){
  if(p.role==='father'||p.role==='mother')return null;
  const dad=intent.startsWith('father');return (intent.endsWith('Job')?(dad?['My dad is a software engineer. He builds apps and works with AI.','Mein Papa ist Softwareentwickler und arbeitet mit KI.','Мой папа — инженер-программист. Он создаёт приложения и работает с ИИ.']:['My mom is a psychologist. She facilitates psychological games, including Leela.','Meine Mama ist Psychologin und begleitet psychologische Spiele, darunter Leela.','Моя мама — психолог. Она проводит психологические игры, в том числе Лилу.']):(dad?['My dad is Igal.','Mein Papa heißt Igal.','Моего папу зовут Igal.']:['My mom is Anastasia.','Meine Mama heißt Anastasia.','Мою маму зовут Anastasia.']))[n];
 }
 return answers[intent]?.[n]||null;
}
