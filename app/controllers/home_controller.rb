class HomeController < ApplicationController

  def index
    @rsvp = Rsvp.new
  end

  def create_rsvp
    raise params.inspect
    #SendRsvp.call()
  end

end

