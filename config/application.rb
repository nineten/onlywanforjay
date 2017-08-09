require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module OnlywanforjayWebsite
  class Application < Rails::Application

    config.time_zone = 'Singapore'

    config.eager_load_paths  += Dir[
      "#{config.root}/app/services/",
      "#{config.root}/lib/"
    ]

  end
end
