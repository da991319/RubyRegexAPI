require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra';
require 'json';

get '/' do
  'Minimal Sinatra Hello World!'
end

get '/testjson/:name' do
  content_type :json
  params.to_json
end

post '/RegexRuby' do
  content_type :json
  @input = params[:input];
  @pattern = params[:pattern];
  @options = params[:options];
  @modifier = "";
  
  if (!@pattern.to_s.empty?)
    @options.split(',').each { |x|
      case x
      when "IgnoreCase"
        @modifier += "i";
      when "Multiline"
        @modifier += "m";
      when "IgnoreWhiteSpace"
        @modifer += "x"
      end
    }
    params[:callback] + "(" + @input.to_s.scan(/#{Regexp.escape(@pattern)}/ + @modifier).to_json.to_s + ")";
  end
end


#get '/RegexRuby/:pattern/:input' do
#  content_type :json
#  @input = params[:input];
#  @pattern = params[:pattern];
#  
#  
#  if (!@pattern.to_s.empty?)
#    @input.to_s.scan(/#{Regexp.escape(@pattern)}/).to_json;
#  end
#  
#end