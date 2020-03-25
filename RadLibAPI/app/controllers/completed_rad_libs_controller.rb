class CompletedRadLibsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index 
    completed = CompletedRadLib.all
    render json: completed, only: [:name, :content]
  end

  def show 
    rad_lib = CompletedRadLib.find_by(id: params[:id])
    render json: rad_lib, only: [:name, :content]
  end

  def create
    complete_lib = CompletedRadLib.create!(
      name: params[:completed_rad_lib][:name],
      content: params[:completed_rad_lib][:content],
      rad_lib_template_id: params[:template_id] 
    ) 
  
    render json: complete_lib
  end

  def destroy 
    rad_lib = CompletedRadLib.find_by(id: params[:id])
    rad_lib.destroy

    render json: rad_lib
  end
end
