require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'  # for rbenv support. (https://rbenv.org)
require 'mina/rvm'    # for rvm support. (https://rvm.io)
require 'mina/unicorn'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :application_name, 'Onlywanforjay'
set :repository, ''

# Optional settings:
#   set :user, 'foobar'          # Username in the server to SSH to.
#   set :port, '30000'           # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# set :shared_dirs, fetch(:shared_dirs, []).push('somedir')
set :shared_dirs,  fetch(:shared_dirs,  []).push('tmp/sockets', 'tmp/pids')
set :shared_files, fetch(:shared_files, []).push('.env')
set :unicorn_env, 'deployment'

set :keep_releases, 2

task :environment do
  invoke :'rvm:use', 'ruby-2.3.0@onlywanforjay'
end

task :setup => :environment do
  command "gem install bundler"
end

task :production do
  set :domain, ''
  set :user, 'ubuntu'
  set :deploy_to, "/home/ubuntu/#{fetch(:application_name)}-production"
  set :rails_env, 'production'
  set :branch, 'production'
  set :unicorn_pid, "#{fetch(:deploy_to)}/shared/tmp/pids/unicorn.pid"
  set :unicorn_cmd, "RAILS_ENV=#{fetch(:rails_env)} bundle exec unicorn"
end

desc "Deploys the current version."
task :deploy => :environment do
  ## uncomment this line to make sure you pushed your local branch to the remote origin
  ## invoke :'git:ensure_pushed'
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    #invoke :'rails:db_create' # For first deploy
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        invoke :'unicorn:restart'
        command 'sudo /etc/init.d/nginx reload' # allow nopasswd in visudo for nginx' init script.
      end
    end
  end
end

task :console => :environment do
  in_path(fetch(:current_path)) do
    command "RAILS_ENV=#{fetch(:rails_env)} bundle exec rails console"
  end
end

task :drop_cache do
  command "sync && echo 1 | sudo tee /proc/sys/vm/drop_caches"
end

task :check_ram do
  command "free -lm"
end

task :process_memory do
  command "ps aux --sort -rss | head -n15"
end

task :nginx_log do
  in_path(fetch(:current_path)) do
    command "tail -f /var/log/nginx/access.log"
  end
end

task :nginx_error do
  in_path(fetch(:current_path)) do
    command "tail -f /var/log/nginx/error.log"
  end
end

task :unicorn_error do
  in_path(fetch(:current_path)) do
    command "tail -f #{fetch(:deploy_to)}/shared/log/unicorn.stderr.log"
  end
end

task :unicorn_log do
  in_path(fetch(:current_path)) do
    command "tail -f #{fetch(:deploy_to)}/shared/log/unicorn.stdout.log"
  end
end
