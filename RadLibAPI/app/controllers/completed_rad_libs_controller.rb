class CompletedRadLibsController < ApplicationController

  def index 
    completed = CompletedRadLib.all
    render json: completed, only: [:name, :content]
  end

  def show 
    rad_lib = CompletedRadLib.find_by(id: params[:id])
    render json: rad_lib, only: [:name, :content]
  end

  def destroy 
    rad_lib = RadLibTemplate.find_by(id: params[:id])
    rad_lib.destroy

    render json: rad_lib
  end
end
