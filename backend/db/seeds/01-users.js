exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      user_uid: "wAGMaaOB8SWSbhKmfuCbPS3piXB2",
      first_name: "mike",
      last_name: "smith",
      email: "m.smith@gmail.com",
      company_name: "GE",
      summary: "great place to work",
      application_method: "m@ge.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "1",
      unlimited: false
    },
    {
      user_uid: "ZQUtu2ibTpUFg68nPPoQMfFQQUN2",
      first_name: "steve",
      last_name: "smith",
      email: "m.smith@BlackRock.com",
      company_name: "BlackRock",
      summary: "no work",
      application_method: "m@BlackRockl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5",
      unlimited: false
    },
    {
      user_uid: "BnpuhRS5xWOeUyqfNvGyNqgz8HA2",
      first_name: "joe",
      last_name: "smith",
      email: "m.smith@IMG.com",
      company_name: "IMG",
      summary: "no work",
      application_method: "m@IMGl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "10",
      unlimited: false
    },
    {
      user_uid: "k6zGdAGNXJboyBH22U4eKNAl3eh2",
      first_name: "mike",
      last_name: "smith",
      email: "m.smith@publix.com",
      company_name: "publix",
      summary: "shop shop",
      application_method: "m@publixl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "4",
      unlimited: true
    },
    {
      user_uid: "dt6jVUI6dudYM5DrSWAbBTddMio1",
      first_name: "kim",
      last_name: "smith",
      email: "m.smith@ace.com",
      company_name: "ace",
      summary: "hammer and nails",
      application_method: "m@acel.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "6",
      unlimited: false
    },
    {
      user_uid: "BNfN3SgLy0XLoeAUvnQzt4I0upT2",
      first_name: "sally",
      last_name: "smith",
      email: "m.smith@homedepot.com",
      company_name: "homedepot",
      summary: "just do it yourself",
      application_method: "m@homedepotl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "7",
      unlimited: false
    },
    {
      user_uid: "0o49ThJUfaPqaYKzHBTS97v9KB01",
      first_name: "kelly",
      last_name: "smith",
      email: "m.smith@Lowes.com",
      company_name: "lowes",
      summary: "just nails",
      application_method: "m@lowesl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "7",
      unlimited: false
    },
    {
      user_uid: "Z9X0aBtlsUWUZRI5KERVivFpJIw1",
      first_name: "jill",
      last_name: "smith",
      email: "m.smith@stop.com",
      company_name: "stop",
      summary: "we do nothing",
      application_method: "m@stopl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5",
      unlimited: true
    },
    {
      user_uid: "tQzX7zHXAxYt3cwaLh5hiECa2vL2",
      first_name: "allie",
      last_name: "smith",
      email: "m.smith@rocks.com",
      company_name: "rocks",
      summary: "we sell rocks",
      application_method: "m@rocksl.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "9",
      unlimited: false
    },
    {
      user_uid: "FGhDotudMKclCqaOCeT2HrzksUy2",
      first_name: "steve",
      last_name: "smith",
      email: "m.smith@foodnstuff.com",
      company_name: "foodnstuff",
      summary: "food and stuff",
      application_method: "m@foodnstuff.com",
      avatar_image:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5",
      unlimited: false
    }
  ]);
};
