class HomeController < ApplicationController

  def index
    @rsvp = Rsvp.new
  end

  def create_rsvp
    #SendRsvp.call()
    respond_to do |format|
      format.json { 
        render json: {
          response: "Success"
        }
      }
    end
  end

  def create_rsvp_params
    params.require(:rsvp).permit(
      :name,
      :email,
      :contact_no,
      :no_of_guests,
      :attending,
      :any_other_messages,
      :no_of_baby_chairs_needed,
      :dietary_concerns,
      names_of_additional_guests_list: [],
    )
  end

end

