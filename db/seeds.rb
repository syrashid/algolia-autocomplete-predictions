# Clear DB
puts "Clearing all Poke'mon"
puts ""
Pokemon.destroy_all

# Populate DB
puts "Generating all Poke'mon"
puts ""
puts "---"
500.times do
  Pokemon.create(
    name: Faker::Games::Pokemon.name,
    location: Faker::Games::Pokemon.location,
    move: Faker::Games::Pokemon.move
  )
  print '.'
end
puts ""
puts "---"

# Confirm DB Populated
puts ""
puts "Generated #{Pokemon.count} Poke'mon!"

