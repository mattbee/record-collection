# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

conditions = Condition.create([
  {state: 'Brand New'},
  {state: 'Nearly New'},
  {state: 'Good'},
  {state: 'OK'},
  {state: 'Bad'},
  {state: 'Awful'},
])

artists = Artist.create([{name: 'Nirvana'}, {name: 'Foo Fighters'}])

records = Record.create([
  {
    title: 'Nevermind',
    release_year: 1991,
    artist: artists.first,
    condition: conditions.first,
  },
  {
    title: 'The Colour and the Shape',
    release_year: 1997,
    artist: artists.last,
    condition: conditions.third,
  }
])
