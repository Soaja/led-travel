// Static review snippets used as fallback when a tour has no approved DB reviews.
// Each tour has 2–3 reviews; getAllReviewsMap() picks one at random server-side.

export type ReviewSnippet = { author: string; comment: string; rating: number };

export const STATIC_REVIEWS_MAP: Record<string, ReviewSnippet[]> = {

  /* ── ISTANBUL ──────────────────────────────────────────────── */

  'istanbul-old-city-full-day-tour': [
    { author: 'Marco R.', comment: 'An incredible full day in Istanbul — Hagia Sophia, Blue Mosque, Grand Bazaar all in one go. Our guide was brilliant.', rating: 5 },
    { author: 'Claire D.', comment: 'Perfect pace, no rushing. We covered everything and still had time to browse the spice market. Highly recommend!', rating: 5 },
    { author: 'Lukas B.', comment: 'Best organised tour I have ever taken. The guide knew every hidden corner of the old city.', rating: 5 },
  ],
  'istanbul-old-city-morning-tour': [
    { author: 'Sofia F.', comment: 'A wonderful morning — we beat the crowds to Hagia Sophia and the atmosphere was magical.', rating: 5 },
    { author: 'James T.', comment: 'Great half-day option. Compact, informative, and the guide was fantastic with the kids.', rating: 5 },
  ],
  'istanbul-old-city-afternoon-tour': [
    { author: 'Elena M.', comment: 'The afternoon light on the Blue Mosque is absolutely stunning. Perfect tour for late arrivals.', rating: 5 },
    { author: 'Pierre L.', comment: 'Loved exploring the Grand Bazaar with a guide — you see so much more than on your own.', rating: 5 },
  ],
  'istanbul-two-continents-tour': [
    { author: 'Anna K.', comment: 'Standing in Europe and then Asia in the same day — what a feeling! The Bosphorus crossing was magical.', rating: 5 },
    { author: 'Tom H.', comment: 'Unique experience crossing two continents. Great local lunch on the Asian side.', rating: 5 },
    { author: 'Giulia C.', comment: 'Kadikoy market on the Asian side was a highlight. Fresh produce, amazing colours, wonderful atmosphere.', rating: 5 },
  ],
  'istanbul-byzantine-ottoman-tour': [
    { author: 'David S.', comment: 'Incredibly deep dive into Byzantine and Ottoman history. Our guide brought every mosaic to life.', rating: 5 },
    { author: 'Isabelle R.', comment: 'The Chora Church mosaics are breathtaking. This tour goes beyond the usual tourist trail.', rating: 5 },
  ],
  'istanbul-old-modern-full-day-tour': [
    { author: 'Carlos G.', comment: 'The contrast between old Sultanahmet and modern Beyoglu in one day was fascinating. Perfect balance.', rating: 5 },
    { author: 'Mia S.', comment: 'Loved ending the day with cocktails in Beyoglu after a morning in the historic district. Great itinerary!', rating: 5 },
  ],
  'istanbul-old-modern-half-day-tour': [
    { author: 'Rafa M.', comment: 'Compact and well-paced. We saw both sides of Istanbul without feeling rushed at all.', rating: 5 },
    { author: 'Nina P.', comment: 'Great intro to Istanbul — historic mosques in the morning, trendy Galata in the afternoon.', rating: 5 },
  ],
  'princes-islands-tour': [
    { author: 'Emma W.', comment: 'A magical escape from the city. No cars on the island — just horse carriages and the sound of the sea.', rating: 5 },
    { author: 'Lena H.', comment: 'Buyukada is gorgeous. We rented bikes, had fresh fish by the sea. Unforgettable day trip.', rating: 5 },
    { author: 'Marco T.', comment: 'The ferry ride through the Bosphorus alone is worth it. The islands are peaceful and charming.', rating: 5 },
  ],
  'bosphorous-dinner-cruise': [
    { author: 'Sophie B.', comment: 'Dinner on the Bosphorus with the city lights reflecting on the water — pure magic. Food was great too!', rating: 5 },
    { author: 'Alessandro V.', comment: 'The most romantic evening of our trip. Live music, delicious food, spectacular views.', rating: 5 },
    { author: 'Rachel K.', comment: 'Sailing past illuminated palaces and bridges at night is something I will never forget.', rating: 5 },
  ],
  'morning-bosphorus-tour-with-breakfast': [
    { author: 'Jan M.', comment: 'Starting the day on the Bosphorus with a Turkish breakfast — what a way to wake up in Istanbul!', rating: 5 },
    { author: 'Chiara F.', comment: 'The morning mist on the water, fresh simit and cheese — absolute perfection.', rating: 5 },
  ],
  'afternoon-bosphorus-tour-with-lunch': [
    { author: 'Paul D.', comment: 'Lovely afternoon cruise with a delicious lunch onboard. Saw both sides of the strait up close.', rating: 5 },
    { author: 'Vera N.', comment: 'Relaxed pace, great food, stunning views of Dolmabahce and Rumeli fortresses from the water.', rating: 5 },
  ],
  'sunset-bosphorus-tour': [
    { author: 'Olivia R.', comment: 'Watching the sunset paint the mosques and minarets gold from the water — nothing compares to this.', rating: 5 },
    { author: 'Diego F.', comment: 'The golden hour on the Bosphorus is absolutely breathtaking. Book this tour — you will not regret it.', rating: 5 },
    { author: 'Hannah L.', comment: 'Truly a once-in-a-lifetime view. The guide explained every landmark as we sailed past.', rating: 5 },
  ],
  'night-bosphorus-tour-with-dinner': [
    { author: 'Stefan K.', comment: 'Istanbul at night from the water is surreal. Dinner was excellent and the live music added to the atmosphere.', rating: 5 },
    { author: 'Monica T.', comment: 'The illuminated bridges and palaces at night are unforgettable. Best way to spend an evening in Istanbul.', rating: 5 },
  ],
  'istanbul-street-food-tour': [
    { author: 'Yusuf A.', comment: 'We tried 12 different foods in 3 hours. Balık ekmek, kokoreç, simit — all explained with their history. Amazing!', rating: 5 },
    { author: 'Laura C.', comment: 'The perfect foodie tour. Our guide took us to places we would never have found alone. Stuffed and happy!', rating: 5 },
    { author: 'Ben W.', comment: 'Hands down the best food tour I have done anywhere in the world. Authentic, fun, delicious.', rating: 5 },
  ],
  'istanbul-paragliding-tour': [
    { author: 'Alex P.', comment: 'Absolutely thrilling! Flying over Istanbul with the Bosphorus below was an experience I will tell for years.', rating: 5 },
    { author: 'Kristina M.', comment: 'Safe, professional, and absolutely exhilarating. The view of Istanbul from the air is breathtaking.', rating: 5 },
  ],
  'topkapi-palace-grand-bazaar': [
    { author: 'Patrick O.', comment: 'The Topkapi treasures are jaw-dropping and the Grand Bazaar is a feast for the senses. Perfect combo.', rating: 5 },
    { author: 'Francesca A.', comment: 'Our guide navigated the Grand Bazaar like a pro — we found the best spots without getting lost.', rating: 5 },
    { author: 'Mark J.', comment: 'Topkapi at opening time before the crowds is something else. The guide timed it perfectly.', rating: 5 },
  ],
  'dolmabahce-palace-and-2-continents': [
    { author: 'Nicole B.', comment: 'Dolmabahce is stunningly opulent. And then crossing to the Asian side for lunch — perfect day.', rating: 5 },
    { author: 'Sergio M.', comment: 'The scale of Dolmabahce Palace is hard to comprehend. Crossing to Asia afterwards made it even more special.', rating: 5 },
  ],
  'sapanca-masukiye-tour': [
    { author: 'Petra H.', comment: 'A wonderful escape into green hills and fresh air. The trout lunch by the stream was delicious.', rating: 5 },
    { author: 'Emil S.', comment: 'Sapanca lake views, forest walks, amazing food — the perfect nature day from Istanbul.', rating: 5 },
    { author: 'Sonia R.', comment: 'Masukiye village is so charming. We had fresh trout, walked in the forest, and completely relaxed.', rating: 5 },
  ],
  'sile-agva-tour-from-istanbul': [
    { author: 'Lisa M.', comment: 'Beautiful Black Sea coastline, Sile lighthouse, and a peaceful river estuary at Agva. Hidden gem!', rating: 5 },
    { author: 'George P.', comment: 'A completely different side of Istanbul — wild beaches, pine forests and authentic fishing villages.', rating: 5 },
  ],
  'yalova-thermal-tour-from-istanbul': [
    { author: 'Claudia N.', comment: 'The thermal baths were incredibly relaxing and the gardens of Yalova are beautiful. Unique day trip.', rating: 5 },
    { author: 'Robert F.', comment: 'Soaking in natural thermal waters surrounded by greenery after a short ferry ride — perfect.', rating: 5 },
  ],
  'green-bursa-tour-from-istanbul': [
    { author: 'Maria L.', comment: 'Bursa is gorgeous — the Green Mosque, Grand Bazaar, and Uludag views. So much history in one city.', rating: 5 },
    { author: 'Theo K.', comment: 'The Bursa Iskender kebab alone is worth the trip. Incredible food, incredible city.', rating: 5 },
    { author: 'Valentina S.', comment: 'The silk market and the old Ottoman hans are fascinating. Our guide was full of knowledge.', rating: 5 },
  ],
  'grand-istanbul-aquarium-tour': [
    { author: 'Cécile D.', comment: 'The kids absolutely loved it — one of the largest aquariums in Europe, with amazing shark tunnels.', rating: 5 },
    { author: 'Simon O.', comment: 'A great option for families. Huge variety of marine life and very well organised.', rating: 5 },
  ],

  /* ── CAPPADOCIA ─────────────────────────────────────────────── */

  'hot-air-baloon-tour': [
    { author: 'Sofia F.', comment: 'Floating over Cappadocia at sunrise is the most magical thing I have ever done. Pure poetry.', rating: 5 },
    { author: 'Carlos G.', comment: 'Los paisajes de Capadocia desde el globo son de otro mundo. La experiencia más increíble de mi vida.', rating: 5 },
    { author: 'Lena S.', comment: 'Der Sonnenaufgang über den Feenkaminen vom Heißluftballon aus — unbeschreiblich schön.', rating: 5 },
  ],
  'green-tour-south-cappadocia-tour': [
    { author: 'Emma W.', comment: 'Underground city of Derinkuyu was mind-blowing — people actually lived there! Amazing history.', rating: 5 },
    { author: 'Marco R.', comment: 'Ihlara Valley hike was stunning. The rock churches along the river canyon are unforgettable.', rating: 5 },
    { author: 'Anna K.', comment: 'The pigeon valley views and Kaymakli underground city made this the best day in Cappadocia.', rating: 5 },
  ],
  'red-tour-north-cappadocia-tour': [
    { author: 'James T.', comment: 'Goreme Open Air Museum is incredible — ancient rock-cut churches with vivid Byzantine frescoes.', rating: 5 },
    { author: 'Claire D.', comment: 'The Devrent and Pasabag valleys look like the surface of Mars. Our guide explained the geology perfectly.', rating: 5 },
    { author: 'Pierre L.', comment: 'Rose Valley at golden hour was breathtaking. The red and pink tones in the rock are surreal.', rating: 5 },
  ],
  'private-konya-tour-from-cappadocia': [
    { author: 'Isabelle R.', comment: 'Konya and the Mevlana Museum were deeply moving. A spiritual experience unlike any other.', rating: 5 },
    { author: 'David S.', comment: 'The salt lake en route is spectacular — completely flat and reflective like a giant mirror.', rating: 5 },
  ],
  'classic-car-tour': [
    { author: 'Alessandro V.', comment: 'Cruising through fairy chimneys in a vintage Renault — absolutely unforgettable and so much fun!', rating: 5 },
    { author: 'Mia S.', comment: 'The classic car photos with Cappadocia backdrops are incredible. Best activity we did here.', rating: 5 },
    { author: 'Ben W.', comment: 'Unique, fun, and incredibly photogenic. The landscape from behind the wheel of a classic car is special.', rating: 5 },
  ],
  'camel-back-riding': [
    { author: 'Rachel K.', comment: 'Riding through the fairy chimneys on a camel at sunrise was a dream. So memorable!', rating: 5 },
    { author: 'Diego F.', comment: 'The camel ride through Love Valley is surreal. Great photos and a genuinely fun experience.', rating: 5 },
  ],
  'professional-photographer-tour': [
    { author: 'Hannah L.', comment: 'I came back with 200 stunning shots. The photographer knew exactly where and when to position us.', rating: 5 },
    { author: 'Stefan K.', comment: 'Worth every penny. The balloon launch field at sunrise with a pro photographer — incredible results.', rating: 5 },
    { author: 'Monica T.', comment: 'Our guide-photographer knew all the secret spots. The photos from Rose Valley at golden hour are stunning.', rating: 5 },
  ],
  'horse-back-riding': [
    { author: 'Laura C.', comment: 'Galloping through valleys with fairy chimneys all around — truly a once-in-a-lifetime experience.', rating: 5 },
    { author: 'Chiara F.', comment: 'Even as a beginner rider I felt completely safe. The horses are gentle and the scenery is breathtaking.', rating: 5 },
  ],
  'private-salt-lake-tour': [
    { author: 'Paul D.', comment: 'Lake Tuz stretches to the horizon — perfectly flat and blinding white. Like walking on another planet.', rating: 5 },
    { author: 'Vera N.', comment: 'The flamingos at the salt lake were a surprise bonus. Stunning landscape unlike anything else.', rating: 5 },
  ],
  'turkish-night-in-the-cave': [
    { author: 'Olivia R.', comment: 'Dancing, whirling dervishes, delicious food and wine — all inside an ancient cave. Magical night!', rating: 5 },
    { author: 'Jan M.', comment: 'The cave setting makes the whole experience incredibly atmospheric. Traditional music was excellent.', rating: 5 },
    { author: 'Nicole B.', comment: 'A fantastic evening — great food, great entertainment, and an unforgettable venue carved into the rock.', rating: 5 },
  ],
  'cappadocia-dervish-ceremony': [
    { author: 'Patrick O.', comment: 'The Sema ceremony is one of the most spiritually moving performances I have ever witnessed.', rating: 5 },
    { author: 'Francesca A.', comment: 'Watching the dervishes whirl in meditation is profoundly beautiful. Our guide explained the ritual perfectly.', rating: 5 },
  ],
  'selfie-touring-at-sunrise': [
    { author: 'Petra H.', comment: 'Up at 4am but absolutely worth it — the light at sunrise with the balloons launching is indescribable.', rating: 5 },
    { author: 'Emil S.', comment: 'The balloon launch field at dawn is the most photogenic scene I have ever witnessed. Perfect.', rating: 5 },
  ],
  'atv-quad-safari-tour': [
    { author: 'Alex P.', comment: 'Riding a quad through Cappadocia valleys was an absolute blast. Got covered in dust and loved every second.', rating: 5 },
    { author: 'Kristina M.', comment: 'So much fun! The valleys look completely different from a quad — raw and wild and spectacular.', rating: 5 },
    { author: 'Sergio M.', comment: 'Best way to explore the terrain. We covered so many valleys in one afternoon.', rating: 5 },
  ],
  'off-road-safari-tour': [
    { author: 'Mark J.', comment: 'Epic 4x4 ride through remote Cappadocia — we reached viewpoints no tourist bus could ever access.', rating: 5 },
    { author: 'George P.', comment: 'The off-road safari took us through hidden valleys and up to incredible viewpoints. Brilliant.', rating: 5 },
  ],

  /* ── EPHESUS / IZMIR ────────────────────────────────────────── */

  'ephesus-tour': [
    { author: 'Emma W.', comment: 'Walking through ancient Ephesus was like stepping into a time machine. The Library of Celsus is breathtaking.', rating: 5 },
    { author: 'Lena S.', comment: 'Our guide brought every column and inscription to life with vivid stories. Absolutely fascinating.', rating: 5 },
    { author: 'Robert F.', comment: 'The scale of the ancient city is hard to grasp until you are standing there. Unmissable.', rating: 5 },
  ],
  'ephesus-quad-safari-tour': [
    { author: 'Tom H.', comment: 'Exploring the Ephesus countryside on a quad was exhilarating — great views of the ancient site from above.', rating: 5 },
    { author: 'Sophie B.', comment: 'Unique way to experience the region. The olive groves and valleys around Ephesus are beautiful.', rating: 5 },
  ],
  'ephesus-sky-diving-tour': [
    { author: 'Marco T.', comment: 'Skydiving over the Aegean coast near Ephesus — absolutely insane views. 10/10 experience!', rating: 5 },
    { author: 'Claudia N.', comment: 'The most thrilling thing I have ever done. Freefall over the Turkish coastline is unforgettable.', rating: 5 },
  ],
  'izmir-city-tour': [
    { author: 'Theo K.', comment: 'Izmir surprised me — cosmopolitan, lively, beautiful harbour. The Kordon promenade at sunset is lovely.', rating: 5 },
    { author: 'Valentina S.', comment: 'The Agora ruins in the middle of a modern city are fascinating. Great guide and great food recommendations.', rating: 5 },
    { author: 'Jan M.', comment: 'Kadifekale fortress views over Izmir bay are spectacular. A very underrated city.', rating: 5 },
  ],

  /* ── PAMUKKALE ──────────────────────────────────────────────── */

  'pamukkale-tour': [
    { author: 'Giulia M.', comment: 'The white travertine terraces of Pamukkale are like a dream. I had to pinch myself — truly unique on Earth.', rating: 5 },
    { author: 'Sophie B.', comment: 'Walking barefoot on the warm calcium terraces with thermal water flowing over them — pure bliss.', rating: 5 },
    { author: 'Lucas V.', comment: 'Hierapolis ruins above the cotton castle are extraordinary. The combination of nature and history is perfect.', rating: 5 },
  ],
  'pamukkale-hot-air-balloon-tour': [
    { author: 'Elena R.', comment: 'Floating over the white terraces of Pamukkale at dawn — one of the most beautiful things I have ever seen.', rating: 5 },
    { author: 'Frank B.', comment: 'The balloon view of Pamukkale is completely different from ground level. Absolutely worth it.', rating: 5 },
  ],
  'pamukkale-tour-from-antalya': [
    { author: 'Cécile D.', comment: 'A long but rewarding day — the Pamukkale terraces are stunning and the Hierapolis ruins add great depth.', rating: 5 },
    { author: 'Simon O.', comment: 'Even coming from Antalya it was absolutely worth the drive. The cotton castle exceeded all expectations.', rating: 5 },
  ],

  /* ── TROY / CANAKKALE ───────────────────────────────────────── */

  'troy-tour-from-canakkale': [
    { author: 'Pierre D.', comment: 'Visiting Troy was a childhood dream realised. Our guide knew the Iliad inside out — incredible storytelling.', rating: 5 },
    { author: 'David S.', comment: 'Standing by the famous wooden horse, imagining Achilles and Hector — our guide made history come alive.', rating: 5 },
    { author: 'Rachel K.', comment: 'The layers of Troy — nine different civilisations — are mind-blowing. A must for any history lover.', rating: 5 },
  ],
  'gallipoli-tour-from-canakkale': [
    { author: 'Ben W.', comment: 'A deeply moving and important experience. The Gallipoli battlefields are sobering and beautifully maintained.', rating: 5 },
    { author: 'Laura C.', comment: 'Our guide delivered the history of Gallipoli with such sensitivity and depth. I was in tears at Lone Pine.', rating: 5 },
    { author: 'Thomas H.', comment: 'Every Australian and New Zealander should visit this place. A profoundly respectful and informative tour.', rating: 5 },
  ],

  /* ── ANTALYA ────────────────────────────────────────────────── */

  'antalya-city-tour': [
    { author: 'Marco R.', comment: 'Kaleici old town is gorgeous — Roman harbour, narrow streets, and beautiful sea views. Great guide.', rating: 5 },
    { author: 'Mia S.', comment: 'Loved exploring the old harbour at golden hour. The Antalya Museum was also impressive.', rating: 5 },
    { author: 'Anna K.', comment: 'The mix of Roman ruins, Ottoman architecture and Mediterranean scenery in Antalya is fantastic.', rating: 5 },
  ],
  'combo-activity-rafting-quad-zipline': [
    { author: 'Alex P.', comment: 'Rafting through the canyon, then quad through pine forests, then zipline — absolutely insane day!', rating: 5 },
    { author: 'Kristina M.', comment: 'Three incredible activities in one day. All well organised and completely safe. Best day of our holiday.', rating: 5 },
    { author: 'Stefan K.', comment: 'The rafting on Koprulu Canyon is world class. Adding quad and zipline made it a perfect adventure day.', rating: 5 },
  ],
  'antalya-paramotor-tour': [
    { author: 'Diego F.', comment: 'Flying over the Mediterranean on a paramotor was absolutely exhilarating. Stunning coastline from above.', rating: 5 },
    { author: 'Hannah L.', comment: 'The coastal views from the paramotor are breathtaking. Professional pilot, totally safe and thrilling.', rating: 5 },
  ],
  'alanya-paragliding-tour': [
    { author: 'Olivia R.', comment: 'Paragliding from Alanya castle over the Mediterranean — the views are jaw-dropping. Did not want to land!', rating: 5 },
    { author: 'Paul D.', comment: 'Soaring over the turquoise sea with Alanya below — one of the highlights of our whole Turkey trip.', rating: 5 },
  ],
  'sagalassos-tour-from-antalya': [
    { author: 'Isabelle R.', comment: 'Sagalassos at 1700m is jaw-dropping — almost no tourists and incredibly well preserved. Hidden gem.', rating: 5 },
    { author: 'Vera N.', comment: 'This ancient city high in the Taurus mountains blew my mind. Our guide was an expert in Roman history.', rating: 5 },
  ],
  'perge-aspendos-side-tour': [
    { author: 'Monica T.', comment: 'Three ancient cities in one day! The Aspendos theatre is the best-preserved Roman theatre I have ever seen.', rating: 5 },
    { author: 'Jan M.', comment: 'Aspendos amphitheatre is stunning — still used for concerts today. Perge and Side were equally impressive.', rating: 5 },
    { author: 'Nicole B.', comment: 'The Roman ruins around Antalya are world class. Our guide brought every stone to life.', rating: 5 },
  ],
  'suluada-island-boat-tour': [
    { author: 'Patrick O.', comment: 'Suluada island has the clearest water I have ever seen. Swimming in that turquoise bay is unforgettable.', rating: 5 },
    { author: 'Francesca A.', comment: 'The boat day to Suluada was perfect — crystal water, good food, great company. Pure Mediterranean bliss.', rating: 5 },
  ],
  'antalya-green-canyon-tour': [
    { author: 'Petra H.', comment: 'The boat ride through the Green Canyon with towering cliffs on both sides is spectacular.', rating: 5 },
    { author: 'Emil S.', comment: 'Stunning emerald water surrounded by pine-covered mountains. A completely different side of Antalya.', rating: 5 },
    { author: 'Chiara F.', comment: 'Swimming in the cold jade-green water of the canyon was incredible. So refreshing and beautiful.', rating: 5 },
  ],
  'demre-myra-kekova-tour': [
    { author: 'George P.', comment: 'Kekova sunken city seen from a glass-bottom boat — ancient ruins under turquoise water. Magical.', rating: 5 },
    { author: 'Lisa M.', comment: 'The rock-cut Lycian tombs of Myra are incredible, and Kekova bay is one of the most beautiful places I have been.', rating: 5 },
  ],
  'termessos-duden-waterfall': [
    { author: 'Theo K.', comment: 'Termessos at 1050m with views over the Taurus mountains — dramatic ruins in a dramatic setting.', rating: 5 },
    { author: 'Valentina S.', comment: 'The Duden waterfall crashing into the sea at sunset is stunning. And Termessos is worth the climb.', rating: 5 },
  ],

  /* ── EASTERN TURKEY / TRABZON ───────────────────────────────── */

  'trabzon-city-tour': [
    { author: 'James T.', comment: 'Sumela Monastery carved into the cliff face is absolutely extraordinary. Trabzon exceeded all expectations.', rating: 5 },
    { author: 'Claire D.', comment: 'The Black Sea coast around Trabzon is lush and green — so different from the rest of Turkey. Wonderful city.', rating: 5 },
    { author: 'Marco T.', comment: 'Hagia Sophia of Trabzon and the old bazaar were highlights. Our guide was passionate and very knowledgeable.', rating: 5 },
  ],
  'uzungol-tour-from-trabzon': [
    { author: 'Lena H.', comment: 'Uzungol looks like Switzerland — misty lake, green mountains, wooden houses. Absolutely breathtaking.', rating: 5 },
    { author: 'Robert F.', comment: 'The drive up to Uzungol through tea plantations and hazelnut groves is as beautiful as the lake itself.', rating: 5 },
    { author: 'Claudia N.', comment: 'I had no idea Turkey had landscapes this lush and green. Uzungol is a hidden paradise.', rating: 5 },
  ],
  'sumela-hamsikoy-tour': [
    { author: 'Cécile D.', comment: 'The Sumela Monastery hanging from the cliff is one of the most dramatic sights I have ever seen.', rating: 5 },
    { author: 'Simon O.', comment: 'Walking up to Sumela through the forest and then seeing the monastery appear in the rock face — wow.', rating: 5 },
  ],
  'hidirnebi-plateau-cal-cave-sera-lake': [
    { author: 'Tom H.', comment: 'The Black Sea plateaus are completely wild and unspoilt. Hidirnebi felt like the edge of the world.', rating: 5 },
    { author: 'Mia S.', comment: 'Sera Lake hidden among the forest and the cave were spectacular. Very off the beaten path.', rating: 5 },
  ],
  'bork-a-karag-l-tour': [
    { author: 'Ben W.', comment: 'Borcka Karagol lake in the middle of the forest — deep turquoise water, total silence. Magical.', rating: 5 },
    { author: 'Anna K.', comment: 'One of the most beautiful natural lakes I have ever seen. The drive through the valley is stunning too.', rating: 5 },
  ],
  'kayabasi-hackali-baba-plateau-cal-cave': [
    { author: 'Diego F.', comment: 'The highland villages of eastern Trabzon are completely authentic — it felt like stepping back 50 years.', rating: 5 },
    { author: 'Rachel K.', comment: 'Cal Cave was impressive and the plateau views on the way were spectacular. A great full-day adventure.', rating: 5 },
  ],
  'ayder-plateau-tour': [
    { author: 'Hannah L.', comment: 'Ayder is magical — thermal baths, waterfalls, alpine meadows and welcoming locals. Loved every moment.', rating: 5 },
    { author: 'Stefan K.', comment: 'The wooden houses, the rushing rivers and the misty mountains of Ayder are unlike anywhere else in Turkey.', rating: 5 },
    { author: 'Elena M.', comment: 'Soaking in natural hot springs while surrounded by green mountains — absolute heaven.', rating: 5 },
  ],
  'firtina-valley-huser-plateau-tour': [
    { author: 'Olivia R.', comment: 'The Firtina valley has stunning Ottoman bridges, rushing rivers and deep gorges. Wildly beautiful.', rating: 5 },
    { author: 'Paul D.', comment: 'The medieval Zinos castle above the valley is extraordinary. The whole drive through was breathtaking.', rating: 5 },
  ],
  'blue-lake-kumbet-plateau': [
    { author: 'Jan M.', comment: 'Blue Lake sits at 3000m — the sky reflected in the water is something I will never forget.', rating: 5 },
    { author: 'Nicole B.', comment: 'Worth every metre of altitude. The plateau landscapes above the clouds are otherworldly.', rating: 5 },
    { author: 'Patrick O.', comment: 'Kumbet plateau in the clouds with that perfect blue lake — one of the best days of my life.', rating: 5 },
  ],
  'gito-plateau-tour': [
    { author: 'Francesca A.', comment: 'Gito plateau in the Kackar mountains is incredibly beautiful — alpine flowers, crisp air, total peace.', rating: 5 },
    { author: 'Petra H.', comment: 'The hike across the plateau with mountain views in every direction was unforgettable.', rating: 5 },
  ],
  'pokut-plateau-waterfall-tour': [
    { author: 'Emil S.', comment: 'Pokut plateau feels untouched by time — traditional wooden houses, mountain views, and a stunning waterfall.', rating: 5 },
    { author: 'Vera N.', comment: 'The most peaceful place I visited in Turkey. The waterfall at the end of the plateau walk was beautiful.', rating: 5 },
  ],
};
