# Reflektioner

## Namngivning

### Namn
**```Chiptune```**  
### Förklaring
Modulens namn
### Reflektion
**Use Problem Domain Names**  
Om man känner till Chiptune så tror jag att man kanske har en liten aning om vad modulen skulle kunna göra.

---

### Namn
**```Instrument.play(note, time = now())```**  
### Förklaring
Metod som spelar en not på ett instrument vid en specifik tid.
### Reflektion
**Use Intention-Revealing Names**  
Även om det är tydligt att det är ett instrument som spelas, så kan man göra det ännu tydligare. Till exempel ```playNote(note)``` för att spela en not nu, och ```playNoteAtTime (note, time)``` för att göra det ännu mer övertydligt.

---

### Namn
**```Sequence```**  
### Förklaring
En klass som innehåller en sekvens av noter.
### Reflektion
**Class Names**  
Sequence kan både vara ett verb och ett substantiv, men i detta fall syftar jag givetvis på substantivet. För att förtydliga detta skulle man kanske kunna skriva NoteSequence, men i musiksammanhang tror jag att man förstår att det handlar om någon slags notsekvens. I musiksammanhang använder man dock ordet "sequencer" för att syfta på något som hanterar noter och uppspelning ... så det kanske är jag som ska tänka om. Eventuellt lägga in flera Sequence i en Sequencer som i sin tur spelar upp alla Sequence.

---

### Namn
**```noteNameToNoteIndex(noteName)```**  
### Förklaring
Konverterar notnamn till respektive notindex i en oktav. C -> 0
### Reflektion
**Make Meaningful Distinctions**  
I koden har jag fyra funktioner som har med omvandling av notnamn och notnummer som 

---

### Namn
**```new Note(noteNumber | noteNotation)```**  
### Förklaring
Klass för att hantera noter.
### Reflektion
**Method Names**  
Tanken med Note-klassen var att kunna hantera noter antingen genom att skriva dess notnummer (ex. 60) eller med notation (ex. C4) för att spela den noten man vill ha. Just nu använder jag samma konstruktor för båda alternativen, men skulle istället kunna använda Factory Pattern på något sätt för att skilja på konstruktorn, så som det föreslås i boken.

---

## Funktioner

I och med att jag tog hänsyn till boken och föreläsningarna så har jag redan försökt minimera funktionerna, men det finns fortfarande förbättringar som kan göras.

### Metodnamn
**```Instrument.play(note, time = now())```**  
### Antal rader
Metod som spelar en not på ett instrument vid en specifik tid.
### Reflektion
**Use Intention-Revealing Names**  
Även om det är tydligt att det är ett instrument som spelas, så kan man göra det ännu tydligare. Till exempel ```playNote(note)``` för att spela en not nu, och ```playNoteAtTime (note, time)``` för att göra det ännu mer övertydligt.

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

Jag är inte helt nöjd med felhanteringen i funktionerna. Det känns som att den inte hör hemma mitt i funktionerna och tar bara plats från det viktiga.