<<<<<<< HEAD

desc "Generates out.pdf containing the listings"
=======
>>>>>>> a74a562aae7e86f3718011c448561e52b3664ede
task :default do
  #sh "a2ps --columns=1 -f 8 -R *.js *.html -o out.ps"
  sh "a2ps --columns=1 -f 8 -R index.html -o out.ps"
  sh "ps2pdf out.ps out.pdf"
end

task :clean do
  sh 'rm -f out.pdf out.ps out.ps~'
end
