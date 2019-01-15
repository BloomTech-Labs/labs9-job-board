
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('login').del()
    .then(function () {
      // Inserts seed entries
      return knex('login').insert([
        { id: 1, user_uid: "wAGMaaOB8SWSbhKmfuCbPS3piXB2", email: "m.smith@gmail.com" },
        { id: 2, user_uid: "ZQUtu2ibTpUFg68nPPoQMfFQQUN2", email: "m.smith@BlackRock.com" },
        { id: 3, user_uid: "BnpuhRS5xWOeUyqfNvGyNqgz8HA2", email: "m.smith@IMG.com" },
        { id: 4, user_uid: "k6zGdAGNXJboyBH22U4eKNAl3eh2", email: "m.smith@publix.com" },
        { id: 5, user_uid: "dt6jVUI6dudYM5DrSWAbBTddMio1", email: "m.smith@ace.com" },
        { id: 6, user_uid: "BNfN3SgLy0XLoeAUvnQzt4I0upT2", email: "m.smith@homedepot.com" },
        { id: 7, user_uid: "0o49ThJUfaPqaYKzHBTS97v9KB01", email: "m.smith@Lowes.com" },
        { id: 8, user_uid: "Z9X0aBtlsUWUZRI5KERVivFpJIw1", email: "m.smith@stop.com" },
        { id: 9, user_uid: "tQzX7zHXAxYt3cwaLh5hiECa2vL2", email: "m.smith@rocks.com" },
        { id: 10, user_uid: "FGhDotudMKclCqaOCeT2HrzksUy2", email: "m.smith@foodnstuff.com" },
      ]);
    });
};
