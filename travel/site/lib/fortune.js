var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];

exports.getfortune = function() {
  var idx = Math.floor(Math.random() * fortunes.length);
  //   console.log(fortunes[idx]);
  //   console.log(idx);
  return fortunes[idx];
};
