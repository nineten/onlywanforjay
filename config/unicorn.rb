rails_env = ENV['RAILS_ENV'] || "development"

worker_processes Integer(ENV["WEB_CONCURRENCY"] || 2)
preload_app true

if rails_env == "development"
  timeout 10000
else
  timeout 30
end

shared_dir = File.expand_path('../../../shared/', __FILE__)
# Set up socket location
listen "#{shared_dir}/tmp/sockets/unicorn.sock", :backlog => 64
# Logging
stderr_path "#{shared_dir}/log/unicorn.stderr.log"
stdout_path "#{shared_dir}/log/unicorn.stdout.log"
# Set master PID location
pid "#{shared_dir}/tmp/pids/unicorn.pid"

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  ActiveRecord::Base.establish_connection
  ActiveRecord::Base.clear_active_connections!
end


