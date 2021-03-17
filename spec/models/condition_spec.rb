require 'rails_helper'

RSpec.describe Condition, type: :model do
  let(:condition) { FactoryBot.build(:condition) }

  it 'is valid with a record condition' do
    expect(condition).to be_valid
  end

  it 'is not valid without a record condition' do
    condition.state = ''
    expect(condition).to_not be_valid
  end

  it 'returns name for to_s method' do
    expect(condition.to_s).to eq(condition.state)
  end
end
