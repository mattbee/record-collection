class ConditionSerializer
  include JSONAPI::Serializer
  attributes :id, :state
end
