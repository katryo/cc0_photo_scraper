require 'pry'
require 'open-uri'

text_files = Dir.glob('./results/*.txt')
text_files.each do |text_file|
  content = File.read(text_file)
  urls = content.split("\n")
  urls.each do |url|
    if url.start_with? 'https://static.pexels.com/photos/'
      name = String.new
      target_url = url.sub(/(.*?)\/(\d+)\/(.*?)-medium(.*?)/) do
        name = $3 + '-' + $2 + $4
        $1 + '/' + $2 +  '/' + $3 + $4
      end
      sleep 1
      File.open('images/' + name, 'wb') do |fo|
        fo.write open(fo).read
      end
    end
  end

  binding.pry
end
