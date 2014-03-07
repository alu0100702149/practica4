desc "run the http server"
task :default do
  sh "ruby app.rb"
end

desc "run the server via rackup"
task :rackup do
  sh "rackup"
end

desc "create heroku app"
task :create, :appname do |t,args|
  name = args[:appname] || 'jsparser';
  sh "heroku create #{name}"
end

desc "deploy  heroku app"
task :deploy  do
  sh "git push heroku master"
end

desc "ps"
task :deploy  do
  sh "heroku ps"
end

desc "logs"
task :logs  do
  sh "heroku logs"
end

desc "destroy deployment in heroku"
task :logs, :appname  do
  name = args[:appname] || 'jsparser';
  sh "heroku apps:destroy #{name}"
end

desc "Generates out.pdf containing the listings"
task :default do
  #sh "a2ps --columns=1 -f 8 -R *.js *.html -o out.ps"
  sh "a2ps --columns=1 -f 8 -R index.html -o out.ps"
  sh "ps2pdf out.ps out.pdf"
end

task :clean do
  sh 'rm -f out.pdf out.ps out.ps~'
end
