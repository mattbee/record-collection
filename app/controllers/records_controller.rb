class RecordsController < ApplicationController

  def index
    records = Record.all
    render json: serializer.new(records), status: :ok
  end

  private

  def serializer
    RecordSerializer
  end
end
