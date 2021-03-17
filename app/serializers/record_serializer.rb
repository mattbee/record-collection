class RecordSerializer
  include JSONAPI::Serializer
  attributes :title, :release_year

  attribute :artist do |object|
    object.artist.to_s
  end

  attribute :condition do |object|
    object.condition.to_s
  end
end
