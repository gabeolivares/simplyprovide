class JobsController < ApplicationController
  def index
    @job = Job.all
  end

  def search
    @job_search = Job.search(params[:search], params[:search_param])
    render json: @job_search
  end

  def create
     @job_create = Job.create!(first_name: params[:first_name],
                               last_name: params[:last_name],
                               email: params[:email],
                               description: params[:description],
                               job_type: params[:job_type],
                               timeline: params[:timeline],
                               price: params[:price])
     @job_create.save
     puts @job_create
     render json: @job_create
  end

  def show
    @job = Job.find(params[:id])
  end

  def destroy
    @job_destroy = Job.find(params[:id]).destroy
    render json: @job_destroy
  end

  def update
    @job_update = Job.find(params[:id])
    @job_update.update_attributes(first_name: params[:first_name],
                                  last_name: params[:last_name],
                                  email: params[:email],
                                  description: params[:description],
                                  desired_timeline: params[:desired_timeline],
                                  price: params[:price])
    render json: @job_update
  end
end
