class SendRsvp
  include Service
  include Virtus.model

  attribute :rsvp, Rsvp

  def call
    session = GoogleDrive::Session.from_service_account_key("gservice_account.json")

    ws = session.spreadsheet_by_key(ENV['GOOGLE_RSVP_SPREADSHEET_KEY']).worksheets[0]

    new_row_index = ws.rows.size + 1
    Constants::ORDER_OF_COLUMNS.each_with_index do |col, n|
      ws[new_row_index, n+1] = rsvp.send(col.symbolize)
    end

    ws.save
  end

end

