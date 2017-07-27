class SendRsvp
  include Service

  def call
    session = GoogleDrive::Session.from_service_account_key("gservice_account.json")

    ws = session.spreadsheet_by_key(ENV['GOOGLE_RSVP_SPREADSHEET_KEY']).worksheets[0]

    p ws.rows.size
  end

end

