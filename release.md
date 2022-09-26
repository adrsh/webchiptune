# Reflektioner

## Namngivning

### Namn
**```Chiptune```**  
### Förklaring
Modulens namn
### Reflektion
**Use Problem Domain Names**  
Om man känner till Chiptune så tror jag att man kanske har en aning om vad modulen skulle kunna göra. Samtidigt är ordet Chiptune ett ganska brett begrepp, och skulle bytas ut mot något som är mer specifik och unikt, t.ex. WebChiptune.

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
Konverterar notnamn till respektive notindex i en oktav. C -> 0.
### Reflektion
**Make Meaningful Distinctions**  
Denna funktion används i Note-klassen för att hantera omvandlingar från namn till nummer, men frågan är då om ordet "note" är överflödigt i detta sammanhang, eller ett så kallat "noise word". I och med att funktionen finns inuti Note-klassen tycker jag att det är underförstått att det handlar om noter, så kanske man kan tycka att det är överflödigt...  
**Add Meaningful Context**  
... men samtidigt är det nog bra att ha kvar det för att underlätta för läsaren om vad funktionen gör utan att behöva förstå dess kontekt.  

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
**```notationToNoteNumber (notation)```**  
### Antal rader
16
### Reflektion
**Do One Thing**  
Just nu gör denna funktion lite för många saker. Felhantering, tar ut en siffra ur en sträng, slicar ut bokstäver, och sedan pusslar ihop resultatet med en lite svårförståelig one-liner. Tidigare innehöll även denna funktion en lång switch-case-sats som bröts ut. Ett förbättringsförslag är att bryta ut felhantering och "stränganalysen" till egna funktioner.

---

### Metodnamn
**```noteNameToNoteIndex (noteName)```**  
### Antal rader
17
### Reflektion
**Switch Statements**  
Denna funktion mappar notnamn till dess index i en oktav, och skulle kunna göras på andra sätt än en switch-sats. En map eller något annan slags "lookup table". 

---

### Metodnamn
**```noteIndexToNoteName (noteIndex)```**  
### Antal rader
17
### Reflektion
**Use Descriptive Names**  
Funktionsnamnet är ganska långt och innehåller ordet "note" flera gånger, men det behövs för att förstå vilket kontext funktionen används i. Men funktionsnamnet kanske skulle kunna förbättras, t.ex att skriva convertNoteIndexToNoteName för att förtydliga att det är en konversion/mappning som görs. 

---

### Metodnamn
**```Sequence.play(tempo, time)```**  
### Antal rader
9
### Reflektion
**Function Arguments - Dyadic Functions**  
Tempot skulle istället kunna vara en attribut i klassen istället för att användas som ett argument.

---

### Metodnamn
**```new Note(number | string)```**  
### Antal rader
12
### Reflektion
**Function Arguments - Argument Objects**  
Denna konstruktor kan ta in antingen ett nummer eller en sträng, t.ex 60 eller "C4". Det hade kanske varit bättre att separera hanteringen av dessa. T.ex om man vill skapa en not så skriver man Note.fromNumber(60) eller Note.fromNotation("C4"). Eller t.ex Note(toMidi("C4")) för att konvertera strängen till Midi-format innan konstruktorn anropas.

Det känns som "bad practice" att kunna ha två olika typer i samma konstruktor, men så är det kanske med ett löst typat språk som Javascript. 

---

## Reflektion
Under tiden jag kodade insåg jag mer och mer att vissa kodsnuttar kunde vara svåra att förstå.
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

Det är lätt hänt att man hamnar i ett så kallat "flow" och inte bryr sig om hur koden ser ut i stunden. Det är nog en bra idé att inte vänta för länge med att omstrukturera den "slarviga" koden innan man själv får svårt att förstå den.

---

## Testspecifikation
### Förberedelser
Kör ```npm run dev``` och gå in på webbplatsen.

### Testfall 1
Spela upp noter.
#### Instruktioner
Klicka på det virtuella pianot under rubriken Keyboard. 
#### Önskat resultat
Tangenten som klickas på spelas upp.

### Testfall 2
Spela upp en sekvens av noter.
#### Instruktioner
Klicka på Play-knappen under rubriken Sequence på webbplatsen. 
#### Önskat resultat
En kort sekvens av noter spelas upp. I koden tas även noter bort från sekvensen och läggs till igen för att testa den funktionaliteten.

### Testfall 3
Spela upp flera sekvenser av noter.
#### Instruktioner
Klicka på Play-knappen under rubriken Multiple sequences på webbplatsen. 
#### Önskat resultat
En kort sekvens av noter spelas upp följt av ännu en sekvens som spelas upp med ett annat instrument.

### Testfall 3
Spela upp flera sekvenser av noter.
#### Instruktioner
Klicka på Play-knappen under rubriken Multiple sequences på webbplatsen. 
#### Önskat resultat
En kort sekvens av noter spelas upp följt av ännu en sekvens som spelas upp med ett annat instrument.

### Testfall 4
Spela upp en melodi.
#### Instruktioner
Klicka på Play-knappen under rubriken Melody på webbplatsen. 
#### Önskat resultat
En kort melodislinga spelas upp när man klickar på Play.

### Testfall 5
Stoppa uppspelningen av en melodi.
#### Instruktioner
Klicka på Play-knappen under rubriken Melody på webbplatsen.
Klicka på Stop-knappen efter en kort stund.
#### Önskat resultat
En kort melodislinga spelas upp när man klickar på Play och stoppas när man klickar på Stop.

## Testrapport
| Testfall | Resultat |
|----------|----------|
| 1        | OK       |
| 2        | OK       |
| 3        | OK       |
| 4        | OK       |
| 5        | OK       |