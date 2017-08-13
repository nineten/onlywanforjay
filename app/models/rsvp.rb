class Rsvp
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming
  include Virtus.model

  attribute :timestamp, String
  attribute :name, String
  attribute :email, String
  attribute :contact_no, String
  attribute :no_of_guests, String
  attribute :attending, String
  attribute :any_other_messages, String
  attribute :no_of_baby_chairs_needed, String
  attribute :names_of_additional_guests, String
  attribute :dietary_concerns, String

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
    self.timestamp = DateTime.now.strftime(Constants::EXPORTED_TIME_FORMAT)
  end

  def names_of_additional_guests_list=(names)
    self.names_of_additional_guests = names.join(", ")
  end

end

