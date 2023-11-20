import { Sql } from 'postgres';

export const commentsnews = [
  {
    id: 1,
    userId: 1,
    newsId: 1,
    comment:
      'This safety feature by Apple is a great step to protect children online.',
  },
  {
    id: 2,
    userId: 2,
    newsId: 1,
    comment: 'Im glad to see technology addressing online safety for kids.',
  },
  {
    id: 3,
    userId: 3,
    newsId: 2,
    comment: 'Exciting new games coming to Oculus Quest 2!',
  },
  {
    id: 4,
    userId: 4,
    newsId: 2,
    comment: 'I cant wait to try out the new VR games on the Meta Quest.',
  },
  {
    id: 5,
    userId: 5,
    newsId: 3,
    comment: 'Apple facing legal issues again, this time in Brazil.',
  },
  {
    id: 6,
    userId: 6,
    newsId: 3,
    comment: 'Interesting ruling regarding the iPhone charger.',
  },
  {
    id: 7,
    userId: 1,
    newsId: 4,
    comment: 'Target changing its approach to PS5 restocks is a positive move.',
  },
  {
    id: 8,
    userId: 2,
    newsId: 4,
    comment: 'Hopefully, this change leads to better availability for PS5.',
  },
  {
    id: 9,
    userId: 3,
    newsId: 5,
    comment:
      'Googls decision to restrict call recording apps is disappointing.',
  },
  {
    id: 10,
    userId: 4,
    newsId: 5,
    comment: 'I rely on call recording apps for important conversations.',
  },
  {
    id: 11,
    userId: 5,
    newsId: 6,
    comment: 'USB-C on iPhone 14 Pro would have been a game-changer.',
  },
  {
    id: 12,
    userId: 6,
    newsId: 6,
    comment: 'I hope Apple considers USB-C for future iPhone models.',
  },
  {
    id: 13,
    userId: 1,
    newsId: 7,
    comment: 'Switching from iPhone to Android without cables? Interesting!',
  },
  {
    id: 14,
    userId: 2,
    newsId: 7,
    comment: 'I wonder how seamless the data transfer process will be.',
  },
  {
    id: 15,
    userId: 3,
    newsId: 8,
    comment: 'Digimon Survive box art looks intriguing!',
  },
  {
    id: 16,
    userId: 4,
    newsId: 8,
    comment: 'Looking forward to the release of Digimon Survive.',
  },
  {
    id: 17,
    userId: 5,
    newsId: 9,
    comment: 'Kingdom Hearts V-Cast brings back memories.',
  },
  {
    id: 18,
    userId: 6,
    newsId: 9,
    comment: "I didn't know about this obscure Kingdom Hearts game.",
  },
  {
    id: 19,
    userId: 1,
    newsId: 10,
    comment:
      'MagSafe Battery Pack getting a speed boost is a pleasant surprise!',
  },
  {
    id: 20,
    userId: 2,
    newsId: 10,
    comment: 'Firmware updates that unlock new features are always welcome.',
  },
  {
    id: 21,
    userId: 3,
    newsId: 11,
    comment: 'Great deals on the Galaxy S22 Ultra!',
  },
  {
    id: 22,
    userId: 4,
    newsId: 11,
    comment: 'Samsung keeping up with amazing deals for the Galaxy S22 line.',
  },
  {
    id: 23,
    userId: 5,
    newsId: 12,
    comment: "Blocking Google's tracking is a win for privacy.",
  },
  {
    id: 24,
    userId: 6,
    newsId: 12,
    comment: 'Privacy-focused initiatives like this are important.',
  },
  {
    id: 25,
    userId: 1,
    newsId: 13,
    comment: 'The new Garmin Vívosmart 5 looks promising!',
  },
  {
    id: 26,
    userId: 2,
    newsId: 13,
    comment:
      "It's about time for a new iteration of the Vívosmart fitness tracker.",
  },
];

export async function up(sql: Sql) {
  for (const commentnews of commentsnews) {
    await sql`
      INSERT INTO commentsnews
        (user_id, news_id, comment)
      VALUES
        (${commentnews.userId}, ${commentnews.newsId}, ${commentnews.comment})
  `;
  }
}

export async function down(sql: Sql) {
  for (const commentnews of commentsnews) {
    await sql`
      DELETE FROM users WHERE id = ${commentnews.id}
    `;
  }
}
