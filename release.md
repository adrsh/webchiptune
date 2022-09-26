

## Namngivning

### Namn
**Chiptune**  
### Förklaring
Modulens namn
### Reflektion
**Use Problem Domain Names**  
Om man känner till Chiptune så tror jag att man kanske har en liten aning om vad modulen skulle kunna göra.

## Funktioner

| Metodnamn | Antal rader | Reflektion |
|-----------|-------------|------------|

## Reflektion
Medan koden skrevs insåg jag mer och mer att vissa kodsnuttar kunde vara svåra att förstå.
Istället för att skriva en one-liner som jag gjorde först
```js
return noteIndexToNoteName(note % 12) + Math.floor((note - 12) / 12)
```
så ändrade jag det till detta
```js
const noteIndex = note % 12
const noteName = noteIndexToNoteName(noteIndex)
const octave = Math.floor((note - 12) / 12)
return noteName + octave
```
Även om koden blev längre, så är den förhoppningsvis lättare att förstå. Jag brukar försöka att hålla saker minimalistiskt, men ibland kan det göra mer skada än nytta. Det har hänt att jag har skrivit one-liners som jag själv har haft svårt att förstå efter att ha läst koden vid ett senare tillfälle.

Ett annat exempel var att istället för att ha långa switch-satser inuti funktionen så bröt jag ut dessa och förbättrade läsbarheten och gjorde funktionen mindre.

I min modul har jag ett par funktioner som används för att konvertera notnamn till notnummer och vice versa. Exempel på dessa funktioner är
```js
function noteToNotation (note)
function noteIndexToNoteName (noteIndex)
function notationToNoteNumber (notation)
function noteNameToNoteIndex (noteName)
```

Jag har inte varit helt nöjd med namngivningen på dessa funktioner och hur användaren i sin tur använder vissa av dessa. En användare skulle behöva använda funktionen <code>test()</code>

Jag är inte helt nöjd med felhanteringen i funktionerna. Det känns som att den inte hör hemma mitt i funktionerna och tar bara plats från det viktiga.