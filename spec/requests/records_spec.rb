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
        data: [{
          id: record.id.to_s,
          attributes: {
            title: record.title,
            release_year: record.release_year.to_s,
            artist: record.artist.to_s,
            condition: record.condition.to_s
          },
          type: 'record',
        }],
        links: {
          self: "http://www.example.com/records"
        },
        meta: {
          pages: 1,
          total: 1
        }
      )
    end

    it 'creates paginated results' do
      record1, record2, record3 = FactoryBot.create_list(:record, 3)
      get '/records', {params: { page: { number: 2, size: 1 } } }
      expect(response.body.to_s).to include("?page[number]=3\\u0026page[size]=1")
    end
  end

  describe '#create' do
    let(:condition) { FactoryBot.create(:condition) }
    let(:artist) { FactoryBot.create(:artist) }
    let(:valid_attrs) do
      {
        "data": {
          "attributes": {
            "title": "Be more kind",
            "release_year": 2018,
            "artist_id": artist.id,
            "condition_id": condition.id
          }
        }
      }
    end

    it 'fails when invalid params provided' do
      post '/records', params: { data: { attributes: { title: '', release_year: nil, artist_id: nil, condition_id: nil } } }
      expect(response.status).to be(422)
    end

    it 'returns 201 created response when valid params provided' do
      post '/records', params: valid_attrs
      expect(response.status).to be(201)
    end

    it 'saves record to database when valid params provided' do
      post '/records', params: valid_attrs
      record = Record.first
      expect(record.title).to eq('Be more kind')
    end
  end
end
