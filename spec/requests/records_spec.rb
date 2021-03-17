require 'rails_helper'

RSpec.describe RecordsController, type: :request do
  describe '#index' do

    it 'returns a HTTP OK response' do
      get '/records'
      expect(response.status).to eq(200)
    end

    it 'returns a complete JSON response' do
      record = FactoryBot.create(:record)

      get '/records'
      body = JSON.parse(response.body).deep_symbolize_keys
      expect(body).to eq(
        'data': [{
          id: record.id.to_s,
          type: 'record',
          attributes: {
            title: record.title,
            release_year: record.release_year.to_s,
            artist: record.artist.to_s,
            condition: record.condition.to_s
          }
        }]
      )
    end
  end

end
