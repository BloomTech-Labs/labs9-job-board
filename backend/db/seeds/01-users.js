exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      userUid: "wAGMaaOB8SWSbhKmfuCbPS3piXB2",
      firstName: "mike",
      lastName: "smith",
      email: "m.smith@gmail.com",
      companyName: "GE",
      summary: "great place to work",
      applicationMethod: "m@ge.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "1"
    },
    {
      userUid: "ZQUtu2ibTpUFg68nPPoQMfFQQUN2",
      firstName: "steve",
      lastName: "smith",
      email: "m.smith@BlackRock.com",
      companyName: "BlackRock",
      summary: "no work",
      applicationMethod: "m@BlackRockl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5"
    },
    {
      userUid: "BnpuhRS5xWOeUyqfNvGyNqgz8HA2",
      firstName: "joe",
      lastName: "smith",
      email: "m.smith@IMG.com",
      companyName: "IMG",
      summary: "no work",
      applicationMethod: "m@IMGl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "10"
    },
    {
      userUid: "k6zGdAGNXJboyBH22U4eKNAl3eh2",
      firstName: "mike",
      lastName: "smith",
      email: "m.smith@publix.com",
      companyName: "publix",
      summary: "shop shop",
      applicationMethod: "m@publixl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "4"
    },
    {
      userUid: "dt6jVUI6dudYM5DrSWAbBTddMio1",
      firstName: "kim",
      lastName: "smith",
      email: "m.smith@ace.com",
      companyName: "ace",
      summary: "hammer and nails",
      applicationMethod: "m@acel.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "6"
    },
    {
      userUid: "BNfN3SgLy0XLoeAUvnQzt4I0upT2",
      firstName: "sally",
      lastName: "smith",
      email: "m.smith@homedepot.com",
      companyName: "homedepot",
      summary: "just do it yourself",
      applicationMethod: "m@homedepotl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "7"
    },
    {
      userUid: "0o49ThJUfaPqaYKzHBTS97v9KB01",
      firstName: "kelly",
      lastName: "smith",
      email: "m.smith@Lowes.com",
      companyName: "lowes",
      summary: "just nails",
      applicationMethod: "m@lowesl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "7"
    },
    {
      userUid: "Z9X0aBtlsUWUZRI5KERVivFpJIw1",
      firstName: "jill",
      lastName: "smith",
      email: "m.smith@stop.com",
      companyName: "stop",
      summary: "we do nothing",
      applicationMethod: "m@stopl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5",
      unlimited: true
    },
    {
      userUid: "tQzX7zHXAxYt3cwaLh5hiECa2vL2",
      firstName: "allie",
      lastName: "smith",
      email: "m.smith@rocks.com",
      companyName: "rocks",
      summary: "we sell rocks",
      applicationMethod: "m@rocksl.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "9"
    },
    {
      userUid: "FGhDotudMKclCqaOCeT2HrzksUy2",
      firstName: "steve",
      lastName: "smith",
      email: "m.smith@foodnstuff.com",
      companyName: "foodnstuff",
      summary: "food and stuff",
      applicationMethod: "m@foodnstuff.com",
      avatarImage:
        "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg",
      balance: "5"
    }
  ]);
};
