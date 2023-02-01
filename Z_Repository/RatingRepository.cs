using Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
                 
namespace Repository
{

    public class RatingRepository : IRatingRepository

    {
        IConfiguration _configuration;
        public RatingRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<Rating> addRequest(Rating RatingDetails)
        {
            string connectionString = "Data Source=srv2\\pupils;Initial Catalog=KidsClothes;Integrated Security=True;Pooling=False";
            string host = RatingDetails.Host;
            string method = RatingDetails.Method;
            string path = RatingDetails.Path;
            string UserAgent = RatingDetails.UserAgent;
            string Referer = RatingDetails.Referer;
            //DateTime recordDate = (DateTime)RatingDetails.RecordDate;
            //@recordDate,[Record_Date]
            string query = "INSERT INTO [RATING]([HOST],[METHOD],[PATH],[USER_AGENT])" +
                             "values(@host,@method,@path,@UserAgent)";
            using (SqlConnection sqlconnection = new SqlConnection(connectionString))
            using (SqlCommand sqlcommand = new SqlCommand(query, sqlconnection))
            {
                sqlcommand.Parameters.Add("@HOST", SqlDbType.NVarChar, 50).Value = host;
                sqlcommand.Parameters.Add("@METHOD", SqlDbType.NVarChar, 50).Value = method;
                sqlcommand.Parameters.Add("@PATH", SqlDbType.NVarChar, 50).Value = path;
                //sqlcommand.Parameters.Add("@Referer", SqlDbType.NVarChar, 50).Value = Referer;
                sqlcommand.Parameters.Add("@UserAgent", SqlDbType.NVarChar, 50).Value = UserAgent;
                //sqlcommand.Parameters.Add("@Record_Date", SqlDbType.DateTime,100).Value = recordDate;
                sqlcommand.Connection.Open();
                int result = sqlcommand.ExecuteNonQuery();
            }
        

            return new Rating();
        }


    }

}
