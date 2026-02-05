Markdown

\# Техническое задание: Веб-приложение "Post Formatter for LinkedIn & Threads"

\#\# 1\. Общее описание проекта  
Разработка одностраничного веб\-приложения (SPA) для написания и форматирования постов.  
**\*\*Основная цель:\*\*** Позволить пользователю писать текст в одном окне и видеть предпросмотр для LinkedIn и Threads с учетом их ограничений.

**\*\*Ключевые особенности:\*\***
\* Дизайн в стиле Google Gemini (Clean, Material 3, Focus-based).
\* Автоматическая разбивка длинных текстов на треды (Threads).
\* Конвертация жирного/курсива в Unicode (чтобы форматирование сохранялось при вставке в соцсети).
\* ~~Сохранение Черновиков~~ (отключено).

\---

\#\# 2\. Технический стек

\* **\*\*Frontend:\*\*** HTML5, CSS3, Vanilla JavaScript (без тяжелых фреймворков вроде React/Vue, так как приложение простое).  
\* **\*\*Backend:\*\*** Node.js (Express) **\*\*ИЛИ\*\*** Python (Flask/FastAPI) — на усмотрение разработчика.  
\* **\*\*База данных:\*\*** superbase.co
\* **\*\*Deployemnt:\*\*** vercel.com

\---

\#\# 3\. Frontend и UI/UX

\#\#\# 3.1. Структура интерфейса  
Дизайн должен строго соответствовать предоставленному HTML/CSS макету (см. Приложение А).

**\*\*Компоненты:\*\***
1\.  **\*\*Header:\*\*** Логотип ~~и кнопка "Мои черновики"~~ (кнопка черновиков отключена).
2\.  **\*\*Editor (Сверху):\*\*** "Плавающая" карточка ввода текста. Без рамок, авто-высота, счетчик символов.  
    \* Тулбар форматирования: Bold, Italic, List.  
3\.  **\*\*Tab Switcher (Центр):\*\*** Переключатель в виде пилюли (LinkedIn / Threads).  
4\.  **\*\*Preview Area (Снизу):\*\***  
    \* **\*\*Режим LinkedIn:\*\*** Одна карточка с полным текстом.  
    \* **\*\*Режим Threads:\*\*** Цепочка связанных сообщений (Thread view).

\#\#\# 3.2. Требования к верстке  
\* Использовать шрифт \`Inter\`.  
\* Полная адаптивность (Desktop-first, но читаемо на Mobile).  
\* Все стили должны быть взяты из предоставленного кода (Приложение А).

\---

\#\# 4\. Бизнес-логика (Client-Side Logic)

\#\#\# 4.1. Алгоритм разбивки на треды (Threads Splitting)  
Текст для Threads должен автоматически разбиваться на части.

**\*\*Правила алгоритма:\*\***  
1\.  **\*\*Лимит:\*\*** Жесткий лимит 500 символов на блок.  
2\.  **\*\*Целостность слов:\*\*** Нельзя разрывать слова. Разрыв должен происходить по пробелу или переносу строки, ближайшему к 500-му символу.  
3\.  **\*\*Перенос остатка:\*\*** Оставшийся "хвост" переносится в следующий блок, где процедура повторяется.  
4\.  **\*\*Визуализация:\*\*** В превью генерируется \`N\` карточек, соединенных визуальной линией (HTML-структура для этого есть в макете).

*\*Пример логики (псевдокод):\**  
\`\`\`javascript  
function splitTextForThreads(text, limit \= 500\) {  
    const chunks \= \[\];  
    while (text.length \> limit) {  
        // Ищем последний пробел в пределах лимита  
        let splitIndex \= text.lastIndexOf(' ', limit);  
        if (splitIndex \=== \-1) splitIndex \= limit; // Если пробелов нет, режем жестко  
          
        chunks.push(text.substring(0, splitIndex));  
        text \= text.substring(splitIndex).trim();  
    }  
    chunks.push(text);  
    return chunks;  
}

### **4.2. Логика форматирования (Magic Unicode)**

Обычные теги \<b\> или \<strong\> **не работают** при копировании в поля ввода соцсетей.

При нажатии кнопки **Bold** или *Italic* в редакторе, приложение должно заменять выделенные буквы на их Unicode-аналоги.

* **Bold:** A \-\> 𝐀, b \-\> 𝐛 (Mathematical Bold).  
* **Italic:** A \-\> 𝐴, b \-\> 𝑏 (Mathematical Italic).

**Важно:** В поле textarea и в блоках preview должен отображаться именно Unicode текст, а не HTML теги.

## ---

<!-- **5\. Backend и База данных** - СЕКЦИЯ УДАЛЕНА

Backend и черновики не используются в текущей версии приложения. -->

## ---

**6\. Функционал копирования**

### **6.1. LinkedIn**

* Кнопка "Копировать для LinkedIn".  
* Копирует **весь** текст из редактора в буфер обмена.  
* Сохраняет Unicode-форматирование и переносы строк.

### **6.2. Threads**

* У каждого блока в цепочке (Thread Item) должна быть **своя** кнопка "Copy".  
* По клику копируется только текст конкретного блока (сегмента).

## ---

**Приложение А: Frontend Source Code**

*(Разработчик должен использовать этот код как основу для index.html и styles.css)*

HTML

\<\!DOCTYPE **html**\>  
\<html lang\="ru"\>  
\<head\>  
    \<meta charset\="UTF-8"\>  
    \<meta name\="viewport" content\="width=device-width, initial-scale=1.0"\>  
    \<title\>Post Formatter\</title\>  
    \<link href\="\[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600\&display=swap\](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600\&display=swap)" rel\="stylesheet"\>  
    \<link href\="\[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css\](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css)" rel\="stylesheet"\>  
    \<style\>  
        :root {  
            \--bg-color: \#F0F4F9;  
            \--card-bg: \#FFFFFF;  
            \--text-primary: \#1F1F1F;  
            \--text-secondary: \#444746;  
            \--accent-linkedin: \#0A66C2;  
            \--accent-threads: \#000000;  
            \--border-radius-lg: 24px;  
            \--shadow-soft: 0 4px 8px rgba(0,0,0,0.02);  
        }  
        body { background-color: var(--bg-color); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; margin: 0; }  
        header { width: 100%; max-width: 800px; padding: 20px; display: flex; justify-content: space-between; }  
        .logo { font-weight: 600; font-size: 1.2rem; display: flex; gap: 10px; align-items: center; }  
        main { width: 100%; max-width: 720px; padding: 0 20px 40px; display: flex; flex-direction: column; gap: 24px; }  
          
        /\* Editor \*/  
        .editor-card { background: var(--card-bg); border-radius: var(--border-radius-lg); padding: 24px; box-shadow: var(--shadow-soft); }  
        textarea { width: 100%; min-height: 200px; border: none; resize: none; font-family: 'Inter'; font-size: 16px; outline: none; }  
        .editor-toolbar { display: flex; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid \#F0F2F5; }  
        .tool-btn { background: transparent; border: none; cursor: pointer; font-size: 16px; padding: 5px 10px; }  
          
        /\* Tabs \*/  
        .tabs-container { background: \#E1E3E1; padding: 4px; border-radius: 50px; display: flex; align-self: center; }  
        .tab-btn { padding: 10px 32px; border-radius: 40px; border: none; background: transparent; cursor: pointer; font-weight: 500; color: var(--text-secondary); }  
        .tab-btn.active { background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }  
        .linkedin-active { color: var(--accent-linkedin) \!important; }  
        .threads-active { color: var(--accent-threads) \!important; }

        /\* Preview Utils \*/  
        .hidden { display: none; }  
          
        /\* LinkedIn Preview \*/  
        .linkedin-post { background: white; border-radius: 8px; border: 1px solid \#E0E2E5; padding: 16px; }  
        .copy-btn-main { width: 100%; background: var(--accent-linkedin); color: white; border: none; padding: 12px; border-radius: 24px; margin-top: 16px; cursor: pointer; font-weight: 600; }

        /\* Threads Preview \*/  
        .thread-item { display: flex; gap: 12px; position: relative; margin-bottom: 0; }  
        .thread-line { position: absolute; left: 20px; top: 45px; bottom: \-15px; width: 2px; background: \#E0E2E5; z-index: 0; }  
        .thread-item:last-child .thread-line { display: none; }  
        .thread-avatar { width: 40px; height: 40px; background: \#000; border-radius: 50%; z-index: 1; flex-shrink: 0; }  
        .thread-body { flex-grow: 1; padding-bottom: 24px; }  
        .thread-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }  
        .thread-text { font-size: 15px; white-space: pre-wrap; }  
        .copy-mini { border: 1px solid \#E0E2E5; background: white; border-radius: 20px; padding: 4px 12px; cursor: pointer; font-size: 12px; margin-top: 8px; float: right; }  
    \</style\>  
\</head\>  
\<body\>  
    \</body\>  
\</html\>  
