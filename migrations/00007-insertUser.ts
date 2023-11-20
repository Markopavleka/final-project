import { Sql } from 'postgres';

export const users = [
  {
    id: 1,
    username: 'elon_innovator',
    email: 'elon.innovator@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230236/wtui3xpawquhij5kba88.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230236/ajemvqnopgit4pmqxsut.jpg',
    bio: 'Founder of SpaceTech and ElectroMotors, visionary entrepreneur, and advocate for sustainable energy.',
  },
  {
    id: 2,
    username: 'william_gateson',
    email: 'william.gateson@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',
    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230233/ydieel2awxw1i2wx0lgy.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230233/yz99gzyt5eh37agtj6je.jpg',
    bio: 'Co-founder of MicroSystems, philanthropist, and advocate for global well-being and education.',
  },
  {
    id: 3,
    username: 'mark_zee',
    email: 'mark.zee@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',
    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230228/n8rbrxfzt1fm8av0rn8r.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230226/vyvoncnu6tez316endjl.jpg',
    bio: 'Co-founder and CEO of SocialNet, focused on connecting people and building online communities.',
  },
  {
    id: 4,
    username: 'sunny_pioneer',
    email: 'sunny.pioneer@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230230/fgvswjrc4g3fwed0wlcy.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230227/x1fnhilq1blqhsrpp0cg.jpg',
    bio: 'CEO of AlphaTech Inc. and SearchGiant, leading innovation in technology and internet services.',
  },
  {
    id: 5,
    username: 'tim_inventor',
    email: 'tim.inventor@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230224/ltv3de2ztxdqo1o92txd.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230225/i0nl3g1d8tqframmqf7t.jpg',
    bio: 'CEO of FruitCo Inc., driving innovation in consumer electronics and software.',
  },
  {
    id: 6,
    username: 'satya_leader',
    email: 'satya.leader@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',
    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230223/lx5xttfr8fbwpuywadg5.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230235/gq81j3kecibha4lppvaq.jpg',
    bio: 'CEO of SoftCorp, leading the company through a transformative era in technology.',
  },
  {
    id: 7,
    username: 'jeff_bezel',
    email: 'jeff.bezel@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230892/rtoimyeueowia3qmtrsw.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230894/undirowyesrllehltn7c.jpg',
    bio: 'Founder of RiverMarket, entrepreneur, and space enthusiast.',
  },
  {
    id: 8,
    username: 'larry_script',
    email: 'larry.script@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',
    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230229/yiqhjzayl5zm1ygwn2r0.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230236/ajemvqnopgit4pmqxsut.jpg',
    bio: 'Co-founder of InfoWeb, focused on innovation in search technology and internet services.',
  },
  {
    id: 9,
    username: 'sergey_brainy',
    email: 'sergey.brainy@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230885/qwqovumjha3uwexcon4w.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230887/kk43t8xxeone1v93gdnh.jpg',
    bio: 'Co-founder of InfoWeb, passionate about advancing technology and exploring new ideas.',
  },
  {
    id: 10,
    username: 'jack_tweetson',
    email: 'jack.tweetson@example.com',
    password_hash:
      '$2b$12$QmOraruoX18OvWGf/tU0JuY.G3lhDnrVTSYrsXlzvZUcs3FdK54R6',

    profile_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230224/ltv3de2ztxdqo1o92txd.jpg',
    background_picture:
      'https://res.cloudinary.com/nebulanexus-7sky/image/upload/v1700230893/c3ucx56yy5whvjbihdqm.jpg',
    bio: 'Co-founder and CEO of MicroBlog, entrepreneur, and advocate for open communication.',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO users
        (username, email, password_hash, profile_picture,background_picture, bio)
      VALUES
        (${user.username}, ${user.email}, ${user.password_hash}, ${user.profile_picture},${user.background_picture},${user.bio})
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users WHERE id = ${user.id}
    `;
  }
}
