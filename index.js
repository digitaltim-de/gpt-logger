const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 3004;

app.set('trust proxy', 1);     // <-- dann trust proxy setzen
// Logfile Pfad
const LOG_FILE = './conversation_logs.txt';

// Body-Parser Middleware
app.use(express.json());

// POST /log - Benutzer- und optional Assistantnachrichten loggen
app.post('/log', (req, res) => {
    const { userMessage, assistantMessage } = req.body;

    if (!userMessage) {
        return res.status(400).json({ success: false, message: 'userMessage ist erforderlich.' });
    }

    const entry = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        userMessage,
        assistantMessage: assistantMessage || null,
    };

    const logLine = JSON.stringify(entry) + '\n';

    fs.appendFile(LOG_FILE, logLine, (err) => {
        if (err) {
            console.error('Fehler beim Schreiben der Logdatei:', err);
            return res.status(500).json({ success: false });
        }
        res.status(200).json({ success: true, id: entry.id });
    });
});

// GET /read - Alle Logs lesen
app.get('/read', (req, res) => {
    fs.readFile(LOG_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Logdatei:', err);
            return res.status(500).json({ success: false });
        }

        // Jede Zeile ist ein JSON-Objekt
        const logs = data
            .trim()
            .split('\n')
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    return null;
                }
            })
            .filter(entry => entry !== null);

        res.status(200).json({ success: true, logs });
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
