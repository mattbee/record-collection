class ConditionsController < ApplicationController

  def index
    record_conditions = Condition.all

    render json: serializer.new(record_conditions), status: :ok
  end

  private

  def serializer
    ConditionSerializer
  end
end
