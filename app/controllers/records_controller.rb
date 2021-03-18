class RecordsController < ApplicationController

  def index
    records = Record.all
    paginated_records = paginator.call(
      records,
      params: pagination_params,
      base_url: request.url
    )
    options = { meta: paginated_records.meta.to_h, links: paginated_records.links.to_h }
    render json: serializer.new(paginated_records.items, options), status: :ok
  end

  def create
    record = Record.new(record_params)
    if record.valid?
      record.save
      render json: record, status: :created
    else
      render json: record.errors, adapter: :json_api,
      status: :unprocessable_entity
    end
  end

  private

  def serializer
    RecordSerializer
  end

  def paginator
    JSOM::Pagination::Paginator.new
  end

  def pagination_params
    params.permit![:page]
  end

  def record_params
    params.require(:data).require(:attributes).permit(:title, :release_year, :artist_id, :condition_id) ||
    ActionController::Parameters.new
  end
end
