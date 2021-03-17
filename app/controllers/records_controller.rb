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
end
