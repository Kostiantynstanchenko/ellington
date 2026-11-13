// Original Ellington Estate articles. Add a new article by appending an object with the same shape.
// `slug` is per language; `body` is HTML per language.
export const articles = [
  {
    id: 'costs', date: '2026-11-05', mins: 6, tone: ['#c8a46b', '#1f3a4d'],
    slug: { en: 'true-cost-of-buying-new-build-spain', es: 'gastos-reales-comprar-obra-nueva-espana', de: 'kaufnebenkosten-neubau-spanien', nl: 'werkelijke-kosten-nieuwbouw-kopen-spanje', sv: 'verkliga-kostnader-kopa-nyproduktion-spanien' },
    title: {
      en: 'The true cost of buying a new-build home in Spain (2026)',
      es: 'Los gastos reales de comprar obra nueva en España (2026)',
      de: 'Kaufnebenkosten beim Neubau in Spanien (2026)',
      nl: 'De werkelijke kosten van een nieuwbouwwoning kopen in Spanje (2026)',
      sv: 'Den verkliga kostnaden för att köpa nyproduktion i Spanien (2026)',
    },
    desc: {
      en: 'VAT, stamp duty, notary, land registry and lawyer: what to budget on top of the price of a new-build home on the Costa Blanca or Costa del Sol.',
      es: 'IVA, AJD, notaría, registro y abogado: cuánto presupuestar además del precio de una vivienda de obra nueva en la Costa Blanca o la Costa del Sol.',
      de: 'MwSt., Stempelsteuer, Notar, Grundbuch und Anwalt: womit Sie zusätzlich zum Kaufpreis eines Neubaus an der Costa Blanca oder Costa del Sol rechnen sollten.',
      nl: 'Btw, zegelrecht, notaris, kadaster en advocaat: wat u bovenop de prijs van een nieuwbouwwoning aan de Costa Blanca of Costa del Sol moet begroten.',
      sv: 'Moms, stämpelskatt, notarie, fastighetsregister och advokat: vad du ska budgetera utöver priset på en nyproducerad bostad på Costa Blanca eller Costa del Sol.',
    },
    body: {
      en: `<p>The price on a developer’s list is never the whole story. On a new-build home in Spain, the taxes are different from a resale purchase, and they differ again between the Costa Blanca and the Costa del Sol. Here is how to build a realistic budget.</p>
<h2>1. VAT (IVA): 10%</h2><p>A first transfer of a newly built home is subject to VAT, not to transfer tax. The rate for homes is 10%, and a garage space and storeroom sold together with the home in the same deed are normally taxed at the same rate. VAT is paid to the developer in step with each payment you make.</p>
<h2>2. Stamp duty (AJD): 1.2% or 1.4%</h2><p>The deed of sale also attracts Actos Jurídicos Documentados, a regional tax. In <strong>Andalucía</strong> (Costa del Sol) the general rate is <strong>1.2%</strong>. In the <strong>Comunitat Valenciana</strong> (Costa Blanca) the general rate is <strong>1.4%</strong> for deeds signed from 1 June 2026, down from 1.5%. Reduced rates exist for some residents and first homes, so ask your lawyer whether one applies to you.</p>
<h2>3. Notary and land registry</h2><p>Both are set by official scales and depend on the price and the length of the deed. As a working figure, allow around 0.5%–1% of the price for the two together.</p>
<h2>4. An independent lawyer</h2><p>We always recommend one. Fees are commonly around 1% of the price plus VAT, sometimes with a minimum. Your lawyer checks the building licence, the bank guarantee on your payments and the contract before you sign.</p>
<h2>5. If you take a mortgage</h2><p>Add a bank valuation, possible arrangement fees and the cost of any linked insurance. Non-resident buyers are usually offered a lower loan-to-value than residents.</p>
<h2>A simple rule of thumb</h2><p>For a home priced at €400,000, budget roughly 12–13% on top of the price in VAT, stamp duty, notary, registry and legal fees before any mortgage costs. Your adviser can prepare an exact breakdown for a specific unit.</p>
<p class="note">This article is general information, not tax or legal advice. Rates are those in force at the date of publication.</p>`,
      es: `<p>El precio de la lista de la promotora nunca es el coste total. En obra nueva los impuestos son distintos a los de la segunda mano, y además cambian entre la Costa Blanca y la Costa del Sol. Así se prepara un presupuesto realista.</p>
<h2>1. IVA: 10%</h2><p>La primera transmisión de una vivienda nueva tributa por IVA, no por ITP. El tipo para viviendas es del 10%, y la plaza de garaje y el trastero vendidos con la vivienda en la misma escritura suelen tributar al mismo tipo. El IVA se paga a la promotora con cada pago.</p>
<h2>2. AJD: 1,2% o 1,4%</h2><p>La escritura tributa además por Actos Jurídicos Documentados, un impuesto autonómico. En <strong>Andalucía</strong> (Costa del Sol) el tipo general es del <strong>1,2%</strong>. En la <strong>Comunitat Valenciana</strong> (Costa Blanca) es del <strong>1,4%</strong> para escrituras desde el 1 de junio de 2026 (antes, 1,5%). Hay tipos reducidos para ciertos supuestos de vivienda habitual: pregunta a tu abogado.</p>
<h2>3. Notaría y Registro</h2><p>Se rigen por aranceles oficiales. Como cifra de trabajo, calcula entre un 0,5% y un 1% del precio para ambos.</p>
<h2>4. Abogado independiente</h2><p>Lo recomendamos siempre. Los honorarios suelen rondar el 1% más IVA. Revisa la licencia, el aval de tus pagos y el contrato antes de firmar.</p>
<h2>5. Si necesitas hipoteca</h2><p>Suma tasación, posibles comisiones y seguros vinculados. A los no residentes se les suele financiar un porcentaje menor.</p>
<h2>Regla práctica</h2><p>Para una vivienda de 400.000 €, presupuesta aproximadamente un 12–13% adicional entre IVA, AJD, notaría, registro y abogado, sin contar la hipoteca. Tu asesor puede preparar el desglose exacto de una vivienda concreta.</p>
<p class="note">Información general, no asesoramiento fiscal ni jurídico. Tipos vigentes a la fecha de publicación.</p>`,
      de: `<p>Der Preis auf der Liste des Bauträgers ist nie der Endpreis. Beim Neubau in Spanien fallen andere Steuern an als beim Wiederverkauf – und sie unterscheiden sich zwischen Costa Blanca und Costa del Sol. So planen Sie realistisch.</p>
<h2>1. Mehrwertsteuer (IVA): 10 %</h2><p>Der Erstverkauf einer neuen Wohnung unterliegt der Mehrwertsteuer, nicht der Grunderwerbsteuer. Der Satz beträgt 10 %; Stellplatz und Abstellraum, die in derselben Urkunde mitverkauft werden, werden in der Regel genauso besteuert. Die MwSt. zahlen Sie mit jeder Rate an den Bauträger.</p>
<h2>2. Stempelsteuer (AJD): 1,2 % oder 1,4 %</h2><p>Auf die Kaufurkunde fällt zusätzlich die regionale Steuer AJD an. In <strong>Andalusien</strong> (Costa del Sol) beträgt der allgemeine Satz <strong>1,2 %</strong>, in der <strong>Region Valencia</strong> (Costa Blanca) <strong>1,4 %</strong> für Urkunden ab dem 1. Juni 2026 (zuvor 1,5 %). Für bestimmte Fälle gibt es ermäßigte Sätze – fragen Sie Ihren Anwalt.</p>
<h2>3. Notar und Grundbuch</h2><p>Beide richten sich nach amtlichen Gebührenordnungen. Rechnen Sie zusammen mit etwa 0,5–1 % des Kaufpreises.</p>
<h2>4. Unabhängiger Anwalt</h2><p>Wir empfehlen immer einen. Üblich sind rund 1 % des Kaufpreises zzgl. MwSt. Er prüft Baugenehmigung, Bankbürgschaft und Vertrag vor der Unterschrift.</p>
<h2>5. Mit Finanzierung</h2><p>Hinzu kommen Bewertung, eventuelle Gebühren und Versicherungen. Nichtresidenten erhalten meist eine niedrigere Beleihungsquote.</p>
<h2>Faustregel</h2><p>Bei einem Kaufpreis von 400.000 € sollten Sie etwa 12–13 % zusätzlich für MwSt., AJD, Notar, Grundbuch und Anwalt einplanen – ohne Finanzierungskosten. Ihr Berater erstellt gern eine genaue Aufstellung für eine konkrete Einheit.</p>
<p class="note">Allgemeine Information, keine Steuer- oder Rechtsberatung. Sätze zum Zeitpunkt der Veröffentlichung.</p>`,
      nl: `<p>De prijs op de lijst van de ontwikkelaar is nooit het hele verhaal. Bij nieuwbouw in Spanje gelden andere belastingen dan bij bestaande bouw, en ze verschillen tussen de Costa Blanca en de Costa del Sol. Zo maakt u een realistische begroting.</p>
<h2>1. Btw (IVA): 10%</h2><p>De eerste levering van een nieuwe woning valt onder de btw, niet onder overdrachtsbelasting. Het tarief is 10%; een parkeerplaats en berging in dezelfde akte vallen doorgaans onder hetzelfde tarief. U betaalt de btw aan de ontwikkelaar bij elke betaling.</p>
<h2>2. Zegelrecht (AJD): 1,2% of 1,4%</h2><p>Op de akte komt daarnaast het regionale AJD. In <strong>Andalusië</strong> (Costa del Sol) is het algemene tarief <strong>1,2%</strong>, in de <strong>regio Valencia</strong> (Costa Blanca) <strong>1,4%</strong> voor akten vanaf 1 juni 2026 (daarvoor 1,5%). Voor sommige situaties gelden verlaagde tarieven — vraag het uw advocaat.</p>
<h2>3. Notaris en kadaster</h2><p>Beide volgen officiële tarieven. Reken samen op ongeveer 0,5–1% van de prijs.</p>
<h2>4. Onafhankelijke advocaat</h2><p>Dat raden we altijd aan. Gebruikelijk is circa 1% van de prijs plus btw. Hij controleert vergunning, bankgarantie en contract vóór ondertekening.</p>
<h2>5. Met hypotheek</h2><p>Tel taxatie, eventuele kosten en verzekeringen erbij op. Niet-ingezetenen krijgen meestal een lagere financieringsgraad.</p>
<h2>Vuistregel</h2><p>Voor een woning van € 400.000 begroot u ongeveer 12–13% extra voor btw, AJD, notaris, kadaster en advocaat, zonder hypotheekkosten. Uw adviseur maakt graag een exacte berekening voor een specifieke woning.</p>
<p class="note">Algemene informatie, geen fiscaal of juridisch advies. Tarieven op de publicatiedatum.</p>`,
      sv: `<p>Priset på byggherrens lista är aldrig hela kostnaden. Vid nyproduktion i Spanien gäller andra skatter än vid andrahandsköp, och de skiljer sig mellan Costa Blanca och Costa del Sol. Så gör du en realistisk budget.</p>
<h2>1. Moms (IVA): 10 %</h2><p>Första överlåtelsen av en nybyggd bostad beläggs med moms, inte överlåtelseskatt. Satsen är 10 %, och garageplats och förråd som säljs i samma köpebrev beskattas normalt likadant. Momsen betalas till byggherren i takt med varje betalning.</p>
<h2>2. Stämpelskatt (AJD): 1,2 % eller 1,4 %</h2><p>Köpebrevet beläggs även med den regionala skatten AJD. I <strong>Andalusien</strong> (Costa del Sol) är den allmänna satsen <strong>1,2 %</strong>, i <strong>Valenciaregionen</strong> (Costa Blanca) <strong>1,4 %</strong> för köpebrev från den 1 juni 2026 (tidigare 1,5 %). Reducerade satser finns i vissa fall — fråga din advokat.</p>
<h2>3. Notarie och fastighetsregister</h2><p>Båda följer officiella taxor. Räkna med cirka 0,5–1 % av priset tillsammans.</p>
<h2>4. Oberoende advokat</h2><p>Vi rekommenderar alltid en. Vanligt är runt 1 % av priset plus moms. Advokaten granskar bygglov, bankgaranti och avtal innan du skriver på.</p>
<h2>5. Med bolån</h2><p>Lägg till värdering, eventuella avgifter och försäkringar. Icke-residenter erbjuds oftast en lägre belåningsgrad.</p>
<h2>Tumregel</h2><p>För en bostad på 400 000 € bör du budgetera cirka 12–13 % extra för moms, AJD, notarie, register och advokat, exklusive bolånekostnader. Din rådgivare tar gärna fram en exakt kalkyl för en specifik bostad.</p>
<p class="note">Allmän information, inte skatte- eller juridisk rådgivning. Satser vid publiceringsdatum.</p>`,
    },
  },
  {
    id: 'offplan', date: '2026-10-22', mins: 5, tone: ['#8fa58a', '#2b4a5c'],
    slug: { en: 'buying-off-plan-spain-payments-guarantees', es: 'comprar-sobre-plano-pagos-avales', de: 'kauf-vom-plan-spanien-zahlungen-buergschaft', nl: 'kopen-op-plan-spanje-betalingen-garanties', sv: 'kopa-pa-ritning-spanien-betalningar-garantier' },
    title: {
      en: 'Buying off-plan in Spain: payments, bank guarantees and warranties',
      es: 'Comprar sobre plano: pagos, avales bancarios y garantías',
      de: 'Kauf vom Plan in Spanien: Zahlungen, Bankbürgschaften und Gewährleistung',
      nl: 'Kopen op plan in Spanje: betalingen, bankgaranties en garanties',
      sv: 'Köpa på ritning i Spanien: betalningar, bankgarantier och garantier',
    },
    desc: {
      en: 'How payments are usually staged on an off-plan home in Spain, how the law protects the money you pay before completion, and what the 1-3-10 year warranties cover.',
      es: 'Cómo suelen escalonarse los pagos en una vivienda sobre plano, cómo protege la ley las cantidades entregadas a cuenta y qué cubren las garantías de 1, 3 y 10 años.',
      de: 'Wie Zahlungen beim Kauf vom Plan üblicherweise gestaffelt sind, wie das Gesetz Ihre Anzahlungen schützt und was die Gewährleistung über 1, 3 und 10 Jahre abdeckt.',
      nl: 'Hoe betalingen bij kopen op plan meestal verlopen, hoe de wet uw aanbetalingen beschermt en wat de garanties van 1, 3 en 10 jaar dekken.',
      sv: 'Hur betalningarna brukar delas upp vid köp på ritning, hur lagen skyddar dina handpenningar och vad garantierna på 1, 3 och 10 år täcker.',
    },
    body: {
      en: `<p>Buying before a building is finished usually means a better choice of units and often a better price. It also means paying part of the price before the home exists, so it is worth understanding how that money is protected.</p>
<h2>How payments are usually staged</h2><p>Every developer sets its own plan, but a common pattern is a reservation deposit to take the unit off the market, a private purchase contract a few weeks later with a larger payment (often 20–30% of the price including the deposit, sometimes split into instalments during construction), and the balance at the notary on completion. VAT is added to each payment.</p>
<h2>The bank guarantee on your money</h2><p>Spanish law requires a developer who takes payments on account before completion to guarantee them — through a bank guarantee or an insurance policy — and to pay them into a special account. If the building is not completed or the licence of first occupation is not obtained in time, you are entitled to recover the amounts paid. Before you sign, your lawyer should receive the individual guarantee certificate for <em>your</em> payments, not just a general statement.</p>
<h2>What the warranties cover after the keys</h2><ul><li><strong>1 year</strong> — finishing and workmanship defects, which the builder must put right.</li><li><strong>3 years</strong> — defects in installations and elements affecting habitability.</li><li><strong>10 years</strong> — structural defects affecting the foundations, beams, slabs and load-bearing walls, backed by mandatory ten-year insurance.</li></ul>
<h2>Our checklist before reservation</h2><ul><li>Building licence granted, or a realistic date for it</li><li>Developer’s completed projects you can visit</li><li>Bank-guarantee wording reviewed by your lawyer</li><li>Specification list, plans and payment plan attached to the contract</li><li>Completion date and penalty clauses in writing</li></ul>
<p class="note">General information only; your lawyer will confirm the position for a specific contract.</p>`,
      es: `<p>Comprar antes de que el edificio esté terminado suele permitir elegir mejor la vivienda y, a menudo, un mejor precio. También implica pagar parte antes de que la casa exista, así que conviene entender cómo se protege ese dinero.</p>
<h2>Cómo se escalonan los pagos</h2><p>Cada promotora tiene su plan, pero lo habitual es una señal de reserva, un contrato privado unas semanas después con un pago mayor (a menudo el 20–30% del precio incluida la reserva, a veces en plazos durante la obra) y el resto en la notaría a la entrega. Cada pago lleva su IVA.</p>
<h2>El aval de tus cantidades</h2><p>La ley obliga a la promotora que cobra cantidades a cuenta a garantizarlas mediante aval bancario o seguro y a ingresarlas en una cuenta especial. Si la obra no se termina o no se obtiene la licencia de primera ocupación en plazo, tienes derecho a recuperar lo pagado. Antes de firmar, tu abogado debe recibir el certificado individual del aval de <em>tus</em> pagos.</p>
<h2>Garantías tras la entrega</h2><ul><li><strong>1 año</strong>: defectos de acabado.</li><li><strong>3 años</strong>: defectos en instalaciones y elementos de habitabilidad.</li><li><strong>10 años</strong>: daños estructurales en cimentación, vigas, forjados y muros de carga, con seguro decenal obligatorio.</li></ul>
<h2>Nuestra lista antes de reservar</h2><ul><li>Licencia de obra concedida o fecha realista</li><li>Promociones terminadas de la promotora que puedas visitar</li><li>Texto del aval revisado por tu abogado</li><li>Memoria de calidades, planos y forma de pago anexos al contrato</li><li>Fecha de entrega y penalizaciones por escrito</li></ul>
<p class="note">Información general; tu abogado confirmará cada contrato concreto.</p>`,
      de: `<p>Wer vor Fertigstellung kauft, hat meist die bessere Auswahl und oft einen besseren Preis – zahlt aber einen Teil, bevor die Wohnung existiert. Darum lohnt es sich zu wissen, wie dieses Geld geschützt ist.</p>
<h2>Übliche Zahlungsstaffel</h2><p>Jeder Bauträger hat seinen eigenen Plan, verbreitet ist: Reservierungsanzahlung, einige Wochen später ein privater Kaufvertrag mit einer größeren Zahlung (oft 20–30 % inkl. Reservierung, teils in Raten während der Bauzeit) und der Rest beim Notar bei Übergabe. Auf jede Zahlung kommt die MwSt.</p>
<h2>Die Bankbürgschaft</h2><p>Das spanische Recht verpflichtet Bauträger, Anzahlungen vor Fertigstellung durch Bankbürgschaft oder Versicherung abzusichern und auf ein Sonderkonto einzuzahlen. Wird nicht fertiggestellt oder die Bezugsgenehmigung nicht rechtzeitig erteilt, haben Sie Anspruch auf Rückzahlung. Vor der Unterschrift sollte Ihr Anwalt die individuelle Bürgschaftsurkunde für <em>Ihre</em> Zahlungen erhalten.</p>
<h2>Gewährleistung nach Übergabe</h2><ul><li><strong>1 Jahr</strong> – Ausführungsmängel.</li><li><strong>3 Jahre</strong> – Mängel an Installationen und Bewohnbarkeit.</li><li><strong>10 Jahre</strong> – Tragwerksmängel, abgesichert durch eine Pflichtversicherung.</li></ul>
<h2>Unsere Checkliste vor der Reservierung</h2><ul><li>Baugenehmigung erteilt oder realistischer Termin</li><li>Fertige Projekte des Bauträgers zur Besichtigung</li><li>Bürgschaftstext vom Anwalt geprüft</li><li>Baubeschreibung, Pläne und Zahlungsplan im Vertrag</li><li>Fertigstellungstermin und Vertragsstrafen schriftlich</li></ul>
<p class="note">Allgemeine Information; Ihr Anwalt prüft den konkreten Vertrag.</p>`,
      nl: `<p>Kopen vóór oplevering betekent meestal meer keuze en vaak een betere prijs, maar ook dat u een deel betaalt voordat de woning bestaat. Het loont om te weten hoe dat geld beschermd is.</p>
<h2>Hoe betalingen meestal verlopen</h2><p>Elke ontwikkelaar heeft een eigen schema; gangbaar is een reserveringsaanbetaling, enkele weken later een privé-koopcontract met een grotere betaling (vaak 20–30% inclusief reservering, soms in termijnen tijdens de bouw) en het restant bij de notaris bij oplevering. Over elke betaling komt btw.</p>
<h2>De bankgarantie</h2><p>De Spaanse wet verplicht ontwikkelaars om aanbetalingen vóór oplevering te garanderen via een bankgarantie of verzekering en ze op een speciale rekening te storten. Wordt het project niet afgerond of komt de bewoningsvergunning niet op tijd, dan heeft u recht op terugbetaling. Laat uw advocaat vóór ondertekening het individuele garantiecertificaat voor <em>uw</em> betalingen ontvangen.</p>
<h2>Garanties na oplevering</h2><ul><li><strong>1 jaar</strong> — afwerkingsgebreken.</li><li><strong>3 jaar</strong> — gebreken aan installaties en bewoonbaarheid.</li><li><strong>10 jaar</strong> — constructieve gebreken, gedekt door een verplichte verzekering.</li></ul>
<h2>Onze checklist vóór reservering</h2><ul><li>Bouwvergunning verleend of realistische datum</li><li>Opgeleverde projecten van de ontwikkelaar die u kunt bezoeken</li><li>Garantietekst gecontroleerd door uw advocaat</li><li>Technische omschrijving, plattegronden en betaalschema bij het contract</li><li>Opleverdatum en boeteclausules op papier</li></ul>
<p class="note">Algemene informatie; uw advocaat beoordeelt het specifieke contract.</p>`,
      sv: `<p>Att köpa innan huset är klart ger oftast bättre val och ibland ett bättre pris, men du betalar en del innan bostaden finns. Därför är det värt att förstå hur pengarna skyddas.</p>
<h2>Så brukar betalningarna se ut</h2><p>Varje byggherre har sin egen plan, men vanligt är en reservationsavgift, några veckor senare ett privat köpeavtal med en större betalning (ofta 20–30 % inklusive reservationen, ibland i delbetalningar under byggtiden) och resten hos notarien vid tillträdet. Moms tillkommer på varje betalning.</p>
<h2>Bankgarantin</h2><p>Spansk lag kräver att byggherrar som tar emot förskottsbetalningar garanterar dem med bankgaranti eller försäkring och sätter in dem på ett särskilt konto. Om bygget inte slutförs eller inflyttningstillstånd inte beviljas i tid har du rätt att få tillbaka pengarna. Innan du skriver på bör din advokat få det individuella garantibeviset för <em>dina</em> betalningar.</p>
<h2>Garantier efter tillträdet</h2><ul><li><strong>1 år</strong> — fel i ytskikt och utförande.</li><li><strong>3 år</strong> — fel i installationer och boendefunktion.</li><li><strong>10 år</strong> — konstruktionsfel, täckta av en obligatorisk försäkring.</li></ul>
<h2>Vår checklista före reservation</h2><ul><li>Bygglov beviljat eller realistiskt datum</li><li>Färdiga projekt från byggherren som du kan besöka</li><li>Garantitexten granskad av din advokat</li><li>Byggbeskrivning, ritningar och betalplan bifogade avtalet</li><li>Tillträdesdatum och viten skriftligt</li></ul>
<p class="note">Allmän information; din advokat bedömer det specifika avtalet.</p>`,
    },
  },
  {
    id: 'coasts', date: '2026-10-08', mins: 5, tone: ['#d9b48f', '#4a6b7a'],
    slug: { en: 'costa-blanca-or-costa-del-sol', es: 'costa-blanca-o-costa-del-sol', de: 'costa-blanca-oder-costa-del-sol', nl: 'costa-blanca-of-costa-del-sol', sv: 'costa-blanca-eller-costa-del-sol' },
    title: {
      en: 'Costa Blanca or Costa del Sol? How to choose your coast',
      es: '¿Costa Blanca o Costa del Sol? Cómo elegir tu costa',
      de: 'Costa Blanca oder Costa del Sol? So wählen Sie Ihre Küste',
      nl: 'Costa Blanca of Costa del Sol? Zo kiest u uw kust',
      sv: 'Costa Blanca eller Costa del Sol? Så väljer du din kust',
    },
    desc: {
      en: 'Airports, budgets, lifestyle and taxes: an honest comparison of Spain’s two most popular coasts for buyers of new-build homes.',
      es: 'Aeropuertos, presupuesto, estilo de vida e impuestos: una comparación honesta de las dos costas más buscadas para comprar obra nueva.',
      de: 'Flughäfen, Budget, Lebensstil und Steuern: ein ehrlicher Vergleich der beiden beliebtesten Küsten Spaniens für Neubaukäufer.',
      nl: 'Luchthavens, budget, levensstijl en belastingen: een eerlijke vergelijking van de twee populairste kusten voor nieuwbouwkopers.',
      sv: 'Flygplatser, budget, livsstil och skatter: en ärlig jämförelse av Spaniens två populäraste kuster för köpare av nyproduktion.',
    },
    body: {
      en: `<p>Most of our clients arrive torn between the same two coasts. Both have mild winters, international communities and a deep pipeline of new-build homes. The difference is in the details.</p>
<h2>Getting there</h2><p>The Costa Blanca is served by <strong>Alicante–Elche airport</strong>, roughly in the middle of the coast, so most towns from Finestrat to Torrevieja are within about 45 minutes. The Costa del Sol is served by <strong>Málaga airport</strong>, with Fuengirola, Mijas and Benalmádena close by and Marbella and Estepona further west.</p>
<h2>Budget</h2><p>As a broad pattern, the Costa del Sol — especially Marbella and the New Golden Mile — trades at higher prices per square metre than most of the Costa Blanca. On the Costa Blanca, the same budget often buys an extra bedroom, a private pool or a larger terrace, particularly in the south around Rojales, Algorfa and Torrevieja.</p>
<h2>Lifestyle</h2><p>The Costa del Sol is busier and more cosmopolitan, with a dense calendar of golf, beach clubs and restaurants and a strong year-round business community. The Costa Blanca is more varied: Alicante is a real Spanish city, the north (Finestrat, Altea, Jávea) mixes mountains and coves, and the south is relaxed and golf-oriented.</p>
<h2>Taxes</h2><p>On a new-build purchase VAT is the same everywhere (10%). The regional stamp duty differs: 1.2% in Andalucía versus 1.4% in the Valencian region for deeds signed from June 2026.</p>
<h2>How we help you decide</h2><p>We usually suggest a two-day viewing trip on one coast rather than a rushed tour of both. Tell us your budget, the bedrooms you need and how you will use the home, and we will build the route.</p>`,
      es: `<p>La mayoría de nuestros clientes llegan dudando entre las mismas dos costas. Ambas tienen inviernos suaves, comunidad internacional y mucha obra nueva. La diferencia está en los detalles.</p>
<h2>Cómo llegar</h2><p>La Costa Blanca tiene el <strong>aeropuerto de Alicante–Elche</strong> en el centro de la costa: de Finestrat a Torrevieja, casi todo queda a unos 45 minutos. La Costa del Sol depende del <strong>aeropuerto de Málaga</strong>, con Fuengirola, Mijas y Benalmádena muy cerca, y Marbella y Estepona más al oeste.</p>
<h2>Presupuesto</h2><p>En general, la Costa del Sol —sobre todo Marbella y la Nueva Milla de Oro— tiene precios por metro cuadrado más altos que la mayor parte de la Costa Blanca. Con el mismo presupuesto, en la Costa Blanca se consigue a menudo un dormitorio más, piscina privada o una terraza mayor, especialmente en el sur.</p>
<h2>Estilo de vida</h2><p>La Costa del Sol es más animada y cosmopolita, con golf, beach clubs y restaurantes todo el año. La Costa Blanca es más variada: Alicante es una ciudad española de verdad, el norte combina montaña y calas, y el sur es tranquilo y de golf.</p>
<h2>Impuestos</h2><p>En obra nueva el IVA es igual en todas partes (10%). El AJD cambia: 1,2% en Andalucía y 1,4% en la Comunitat Valenciana para escrituras desde junio de 2026.</p>
<h2>Cómo te ayudamos</h2><p>Solemos proponer un viaje de visitas de dos días en una sola costa en lugar de recorrer ambas con prisas. Cuéntanos presupuesto, dormitorios y uso, y diseñamos la ruta.</p>`,
      de: `<p>Die meisten Kunden schwanken zwischen denselben zwei Küsten. Beide bieten milde Winter, internationale Nachbarn und viele Neubauprojekte. Der Unterschied liegt im Detail.</p>
<h2>Anreise</h2><p>Die Costa Blanca wird vom <strong>Flughafen Alicante–Elche</strong> in der Mitte der Küste bedient; von Finestrat bis Torrevieja liegen die meisten Orte etwa 45 Minuten entfernt. Die Costa del Sol hängt am <strong>Flughafen Málaga</strong>, mit Fuengirola, Mijas und Benalmádena ganz nah und Marbella und Estepona weiter westlich.</p>
<h2>Budget</h2><p>Grundsätzlich liegen die Quadratmeterpreise an der Costa del Sol – besonders in Marbella und an der New Golden Mile – über denen der meisten Orte an der Costa Blanca. Dort bekommt man fürs gleiche Budget oft ein Schlafzimmer mehr, einen Privatpool oder eine größere Terrasse, vor allem im Süden.</p>
<h2>Lebensstil</h2><p>Die Costa del Sol ist lebhafter und kosmopolitischer, mit Golf, Beachclubs und Restaurants rund ums Jahr. Die Costa Blanca ist vielfältiger: Alicante ist eine echte spanische Stadt, der Norden verbindet Berge und Buchten, der Süden ist ruhig und golforientiert.</p>
<h2>Steuern</h2><p>Die MwSt. auf Neubau ist überall gleich (10 %). Die AJD unterscheidet sich: 1,2 % in Andalusien, 1,4 % in der Region Valencia für Urkunden ab Juni 2026.</p>
<h2>Wie wir helfen</h2><p>Wir empfehlen meist zwei Besichtigungstage an einer Küste statt einer gehetzten Tour durch beide. Nennen Sie uns Budget, Schlafzimmer und Nutzung – wir planen die Route.</p>`,
      nl: `<p>De meeste klanten twijfelen tussen dezelfde twee kusten. Beide hebben zachte winters, een internationale gemeenschap en veel nieuwbouw. Het verschil zit in de details.</p>
<h2>Bereikbaarheid</h2><p>De Costa Blanca heeft de <strong>luchthaven Alicante–Elche</strong> midden aan de kust; van Finestrat tot Torrevieja ligt bijna alles op zo’n 45 minuten. De Costa del Sol draait om de <strong>luchthaven van Málaga</strong>, met Fuengirola, Mijas en Benalmádena dichtbij en Marbella en Estepona verder westelijk.</p>
<h2>Budget</h2><p>In grote lijnen liggen de prijzen per vierkante meter aan de Costa del Sol — vooral in Marbella en aan de New Golden Mile — hoger dan aan het grootste deel van de Costa Blanca. Daar koopt u met hetzelfde budget vaak een extra slaapkamer, een privézwembad of een groter terras, vooral in het zuiden.</p>
<h2>Levensstijl</h2><p>De Costa del Sol is drukker en kosmopolitischer, met golf, beachclubs en restaurants het hele jaar. De Costa Blanca is gevarieerder: Alicante is een echte Spaanse stad, het noorden combineert bergen en baaien, het zuiden is rustig en golfgericht.</p>
<h2>Belastingen</h2><p>De btw op nieuwbouw is overal gelijk (10%). Het AJD verschilt: 1,2% in Andalusië en 1,4% in de regio Valencia voor akten vanaf juni 2026.</p>
<h2>Hoe wij helpen</h2><p>We stellen meestal een bezichtigingsreis van twee dagen aan één kust voor, in plaats van beide kusten in een sneltreinvaart. Vertel ons budget, slaapkamers en gebruik, en wij plannen de route.</p>`,
      sv: `<p>De flesta av våra kunder tvekar mellan samma två kuster. Båda har milda vintrar, internationella grannar och gott om nyproduktion. Skillnaden ligger i detaljerna.</p>
<h2>Att ta sig dit</h2><p>Costa Blanca har <strong>Alicante–Elche flygplats</strong> mitt på kusten, så de flesta orter från Finestrat till Torrevieja nås på cirka 45 minuter. Costa del Sol har <strong>Málagas flygplats</strong>, med Fuengirola, Mijas och Benalmádena nära och Marbella och Estepona längre västerut.</p>
<h2>Budget</h2><p>Generellt ligger kvadratmeterpriserna på Costa del Sol — särskilt i Marbella och längs New Golden Mile — högre än på större delen av Costa Blanca. Där ger samma budget ofta ett extra sovrum, egen pool eller större terrass, särskilt i söder.</p>
<h2>Livsstil</h2><p>Costa del Sol är livligare och mer kosmopolitisk, med golf, beachklubbar och restauranger året runt. Costa Blanca är mer varierad: Alicante är en riktig spansk stad, norr blandar berg och vikar och söder är lugnt och golfinriktat.</p>
<h2>Skatter</h2><p>Momsen på nyproduktion är densamma överallt (10 %). Stämpelskatten skiljer sig: 1,2 % i Andalusien och 1,4 % i Valenciaregionen för köpebrev från juni 2026.</p>
<h2>Så hjälper vi dig</h2><p>Vi föreslår oftast en visningsresa på två dagar längs en kust i stället för en stressad tur längs båda. Berätta budget, antal sovrum och hur du ska använda bostaden, så planerar vi rutten.</p>`,
    },
  },
];
