class HomeController < ApplicationController

  def index
  end

  def create_rsvp
    SendRsvp.call()
  end

end

